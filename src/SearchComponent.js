import React, { useState, useCallback } from 'react';
import { Sliders, Search } from 'lucide-react';
import SearchPostGrid from './SearchPostGrid';
import FiltersModal from './FiltersModal';

function SearchComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // Estado para la búsqueda
    const [submittedQuery, setSubmittedQuery] = useState(''); // Para disparar la búsqueda

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = useCallback(() => {
        setSubmittedQuery(searchQuery);
    }, [searchQuery]);
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
            event.target.blur(); // Esto oculta el teclado en móviles
        }
    };    

    return (
        <div className="contenedor-global">
            <div className="contenedor-searchbar-glow">
            <div className="contenedor-searchbar">
                {/* Botón de Filtros */}
                <button className="btn btn-filters flex items-center justify-center gap-2" onClick={openModal}>
                    <Sliders className="w-6 h-6 text-white" />
                    <span className="icons-opacity hidden lg:inline">Filters</span>
                </button>

                {/* Barra de búsqueda */}
                <div className="custom-search">
                    <svg
                        className="icons-opacity w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                    >
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        type="search"
                        placeholder="Search Texture Packs or More..."
                        className="placeholder-hidden text-search placeholder:text-gray-400 placeholder:text-opacity-70"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                {/* Botón de Búsqueda */}
                <button
                    className="btn btn-search-enter flex items-center justify-center hover:bg-gradient-to-r hover:from-[#0DE6CD] hover:to-[#63E61D]"
                    onClick={handleSearchSubmit}
                >
                    <Search className="icon-hidden w-6 h-6 text-white" />
                    <span className="icons-opacity hidden lg:inline">Search</span>
                </button>
                </div>
            </div>

            <div className="contenedor-entries">
                <SearchPostGrid searchQuery={submittedQuery} />
            </div>

            {/* Modal de Filtros */}
            <FiltersModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
    );
}

export default SearchComponent;


/*
XS = Default
SM = 640px
MD = 768px
LG = 1024px
XL = 1280px
*/

/*

Medidas fijas:
320px
Medidas flexibles:
321px ---> adelante

768px <--- Telefono 
*/