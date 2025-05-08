import { RiCrossFill } from "react-icons/ri";
import './GraveStyles.css'

function Grave({myGrave}){

    let hrefName

    if (myGrave.name === "Amen"){
        hrefName = "https://en.wikipedia.org/wiki/Amen_(website)";
    }
    else if (myGrave.name === "Vox"){
        hrefName = "https://en.wikipedia.org/wiki/Vox_(blogging_platform)"
    }
    else{
        hrefName = "https://en.wikipedia.org/wiki/" + myGrave.name
    }

    return(
        <>
        <div className="grave">
            <RiCrossFill size={40}/>
            <h2><a href={hrefName}>{myGrave.name}</a></h2>         
            <p className="typeStyle">{myGrave.type}</p>
            <p className="dateStyles">{myGrave.dateLaunch}  -  {myGrave.dateDefunct}</p>
            <p>{myGrave.focus}</p>
        </div>
        </>
    )
}



function GraveYard({getGraves}) {

    return (
        <>
        <div className="graveYard">
            {}
            {getGraves && getGraves.map((grave) => {
                // Añadimos un key diferente en cada elemento
                // usando el id de cada pokemon:

                //data.types[0].type.name
                //console.log(grave.id)
                return (
                    <div key={grave.id}>
                        <Grave myGrave={grave} />
                    </div>
                    )
            })}

        </div>
        </>
    )
}



export default GraveYard;