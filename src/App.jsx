import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GraveYard from './pages/GraveYard.jsx'
import Header from './components/Header.jsx'
import './App.css'

/*
const[socialMediaList, setSocialMediaList] = useState([]);
const [isLoading, setIsLoading] = useState(true); 
*/


function App() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [count, setCount] = useState(0)

  useEffect(() => {
    const initialState = JSON.parse(localStorage.getItem('data'))

    if (initialState) {
      setTableData(initialState)
    } else {
      try {
        fetch(
          'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_defunct_social_networking_services&format=json&origin=*'
        ).then(response => response.json())
          //.then(data => console.log(data))  
          .then(json => {

            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(json.parse.text['*'], 'text/html');

            const tables = htmlDoc.querySelectorAll('table.wikitable');
            const allTables = [];

            tables.forEach(table => {
              const rows = table.querySelectorAll('tr');
              const parsedRows = [];
              let idGrave = 0;

              rows.forEach(row => {
                const cells = row.querySelectorAll('th, td');
                const rowData = Array.from(cells).map(cell => cell.textContent.trim());
                const objData = {
                  id: idGrave,
                  name: rowData[0],
                  type: rowData[1],
                  focus: rowData[2]
                }
                parsedRows.push(objData);
                idGrave++;
              });
              allTables.push(parsedRows);
            });
            setTableData(allTables)

          })
      } catch (error) {
        console.error('Error fetching Wikipedia data:', error);
      }
    }




  }, []);

  useEffect(() => {
    if (tableData.length > 0) {
      localStorage.setItem('data', JSON.stringify(tableData))
    }
  }, [tableData])



  return (
    <>
      <Header/>
      {isLoading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <GraveYard getGraves={tableData[0]} />
      )}

    </>
  )
}

export default App
