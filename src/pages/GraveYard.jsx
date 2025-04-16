import { RiCrossFill } from "react-icons/ri";

function Grave({myGrave}){

    return(
        <>
        <div className="grave">
            <RiCrossFill size={40}/>
            <h2>{myGrave.name}</h2>         
            <p>{myGrave.type}</p>
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
                console.log(grave.id)
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