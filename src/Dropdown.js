import React, { useState, useEffect, useRef } from 'react';

const Dropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dropdownRef = useRef(null); // Referencia al dropdown

  const handleSearch = () => {
    console.log('Buscando:', searchTerm, 'en la categoría:', selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsDropdownActive(false); // Cerrar el dropdown al seleccionar una categoría
    document.activeElement.blur(); // Evitar que el foco se quede en el dropdown
  };

  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado
    setIsDropdownActive(!isDropdownActive); // Alternar el estado del dropdown
  };

  // Función para manejar clics fuera del dropdown
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownActive(false); // Cerrar el dropdown si el clic fue fuera
    }
  };

  // Usar useEffect para escuchar los clics fuera del dropdown
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside); // Limpiar el evento cuando el componente se desmonta
    };
  }, []);

  return (
    <div className='container-1'>

<div className='container-2'>

    <div className="flex justify-center w-5/6">
      <div className="flex w-full max-w-5/6 items-center">
        {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <label
            tabIndex={0}
            className={`btn m-1 w-40 flex items-center justify-between ${
              isDropdownActive
                ? 'bg-gradient-to-r from-[#0DE6CD] to-[#63E61D]' // Degradado activo
                : 'bg-gray-700'
            } text-white border-gray-700`}
            onClick={toggleDropdown}
            style={{ cursor: 'pointer' }} // Evitar que se mueva cuando se hace clic
          >
            {selectedCategory}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </label>
          {isDropdownActive && (
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-gray-800 text-white w-52 absolute top-full left-0 mt-1"
            >
              <li>
                <button
                  onClick={() => handleCategoryChange('All categories')}
                  className="hover:bg-gray-700 w-full text-left p-2 rounded"
                >
                  All categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryChange('Texture Packs')}
                  className="hover:bg-gray-700 w-full text-left p-2 rounded"
                >
                  Texture Packs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryChange('Tops')}
                  className="hover:bg-gray-700 w-full text-left p-2 rounded"
                >
                  Tops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryChange('Mods')}
                  className="hover:bg-gray-700 w-full text-left p-2 rounded"
                >
                  Mods
                </button>
              </li>
            </ul>
          )}
        </div>

        <label className="input w-5/6 text-white bg-gray-800 border border-gray-700 p-[2px]">
          <div className="relative bg-gray-800 flex items-center px-2 w-full">
            <svg
              className="h-[1em] opacity-70 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              required
              placeholder="Search Texture Packs or More..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white outline-none w-full px-2"
            />
          </div>
        </label>

        <button
          className="btn w-40 text-white border-gray-700
            bg-gray-700 hover:bg-gradient-to-r 
            hover:from-[#0DE6CD] hover:to-[#63E61D] "
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
    </div>
    <div className="container-3">
  <div className="flex w-5/6 space-x-4">
    <button
      className="btn w-auto text-white border-gray-700 bg-gray-700 hover:bg-gradient-to-r hover:from-[#0DE6CD] hover:to-[#63E61D]"
    >
      Filters
    </button>

    <button
      className="btn w-auto text-white border-gray-700 bg-gray-700 hover:bg-gradient-to-r hover:from-[#0DE6CD] hover:to-[#63E61D]"
    >
      Search
    </button>

    <button
      className="btn w-auto text-white border-gray-700 bg-gray-700 hover:bg-gradient-to-r hover:from-[#0DE6CD] hover:to-[#63E61D]"
    >
      Search
    </button>

    <button
      className="btn w-auto text-white border-gray-700 bg-gray-700 hover:bg-gradient-to-r hover:from-[#0DE6CD] hover:to-[#63E61D]"
    >
      Search
    </button>

    <button
      className="btn w-auto text-white border-gray-700 bg-gray-700 hover:bg-gradient-to-r hover:from-[#0DE6CD] hover:to-[#63E61D]"
    >
      Search
    </button>
  </div>
</div>

    </div>
  );
};

export default Dropdown;


const btn = document.getElementById('btn');
let count = 0;
function render(){
  btn.innerText = 'Count: ${count}';
}

btn.addEventListener('click', () =>{
  //Count from 1 to 10
  if (count < 10) {
    count += 1;
    render();
  }
});