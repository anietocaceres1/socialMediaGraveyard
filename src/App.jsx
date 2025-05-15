import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GraveYard from './pages/GraveYard.jsx'
import Header from './components/Header.jsx'
import AsSeenOn from './components/AsSeenOn.jsx'
import WebInfo from './components/WebInfo.jsx'
import './App.css'
import data from './data.json'

/*
const[socialMediaList, setSocialMediaList] = useState([]);
const [isLoading, setIsLoading] = useState(true); 
*/


function App() {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [count, setCount] = useState(0)

  useEffect(() => {

    setTableData(data)

    console.log(tableData)
    console.log(data)

  }, []);


  return (
    <>
      <Header/>
      {isLoading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <GraveYard getGraves={tableData} />
      )}
      <AsSeenOn/>
      <WebInfo/>

    </>
  )
}

export default App
