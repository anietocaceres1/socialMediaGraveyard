import React, { useState, useEffect } from 'react';
import './GraveStyles.css';
import usePagination from "../components/UsePaginator.jsx";
import { RiCrossFill } from "react-icons/ri";

function Grave({ myGrave }) {
    let hrefName;

    if (myGrave.name === "Amen") {
        hrefName = "https://en.wikipedia.org/wiki/Amen_(website)";
    } else if (myGrave.name === "Vox") {
        hrefName = "https://en.wikipedia.org/wiki/Vox_(blogging_platform)";
    } else {
        hrefName = "https://en.wikipedia.org/wiki/" + myGrave.name;
    }

    return (
        <div className="grave">
            <RiCrossFill size={40} />
            <h2>
                <a href={hrefName} target="_blank" rel="noopener noreferrer">
                    {myGrave.name}
                </a>
            </h2>
            <p className="typeStyle">{myGrave.type}</p>
            <p className="dateStyles">{myGrave.dateLaunch} - {myGrave.dateDefunct}</p>
            <p>{myGrave.focus}</p>
        </div>
    );
}

function GraveYard({ getGraves }) {
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 12;

    const filteredData = searchTerm
        ? getGraves.filter((grave) =>
            grave.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : getGraves;

    const {
        currentData,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        firstPage,
        lastPage,
        goToPage,
        getPageNumbers
    } = usePagination(filteredData, itemsPerPage);

    const visiblePages = getPageNumbers(5); // Ajusta el número de páginas visibles

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        goToPage(1); // Resetear a la primera página al cambiar el término de búsqueda
    };

    return (
        <div>

            <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={handleSearchChange}
                className='searchBar'
            />
            <div className="graveYard">
                {currentData.map((grave) => (
                    <div key={grave.id}>
                        <Grave myGrave={grave} />
                    </div>
                ))}
            </div>

            {/* Controles de Paginado */}

                <div className="paginationControls">

                    {currentPage >= 4 && (
                        <button onClick={firstPage} disabled={currentPage === 1}>
                            {"1..."}
                        </button>
                    )}

                    <button onClick={prevPage} disabled={currentPage === 1}>
                        {"<"}
                    </button>

                    {visiblePages.map((page) => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={currentPage === page ? "active" : ""}
                        >
                            {page}
                        </button>
                    ))}

                    <button onClick={nextPage} disabled={currentPage === totalPages}>
                        {">"}
                    </button>
                    {currentPage <= (totalPages - 3) && (
                        <button onClick={lastPage} disabled={currentPage === totalPages}>
                            {"..." + totalPages}
                        </button>
                    )}

                </div>
        </div>
    );
}

export default GraveYard;