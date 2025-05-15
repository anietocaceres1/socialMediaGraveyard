import { useState } from "react";

function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const currentData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const nextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const firstPage = () => {
        setCurrentPage(1);
    };

    const lastPage = () => {
        setCurrentPage(totalPages);
    };

    const goToPage = (page) => {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    };

    // Obtener un rango de números de página
    const getPageNumbers = (maxVisiblePages = 5) => {
        const pages = [];
        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + maxVisiblePages - 1, totalPages);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(end - maxVisiblePages + 1, 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return {
        currentData,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        firstPage,
        lastPage,
        goToPage,
        getPageNumbers,
    };
}

export default usePagination;