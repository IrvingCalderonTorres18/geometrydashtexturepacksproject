import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import './App.css';

const API_BASE = 'http://localhost:10004/graphql';

const PaginationR = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [inputPage, setInputPage] = useState(currentPage);
    const [errorMessage, setErrorMessage] = useState('');
    const [tagsCache, setTagsCache] = useState({});
    
    const handleSearch = () => {
      console.log('Buscando:', searchTerm);
      setCurrentPage(1);
      setInputPage(1);
      fetchPosts(1);
    };
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

    const fetchPosts = async (page = 1) => {
      setLoading(true);
      try {
        const query = `
          query GetPosts($page: Int!, $perPage: Int!, $search: String) {
            posts(
              where: { 
                search: $search,
                offsetPagination: { offset: $offset, size: $perPage }
              }
            ) {
              nodes {
                id
                title
                date
                content
                tags {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
              pageInfo {
                offsetPagination {
                  total
                }
              }
            }
            tags(where: { search: $search }) {
              nodes {
                id
                name
                slug
                posts {
                  nodes {
                    id
                    title
                    date
                    content
                  }
                }
              }
            }
          }
        `;

        const variables = {
          page,
          perPage: 3,
          offset: (page - 1) * 3,
          search: searchTerm
        };

        const response = await fetch(API_BASE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });

        const data = await response.json();
        
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        // Combinar resultados de posts y tags
        const postsFromTags = data.data.tags.nodes.flatMap(tag => 
          tag.posts.nodes.map(post => ({
            ...post,
            tagNames: [tag.name],
            matchedBy: 'tag'
          }))
        );

        const postsFromSearch = data.data.posts.nodes.map(post => ({
          ...post,
          tagNames: post.tags.nodes.map(tag => tag.name),
          matchedBy: 'title'
        }));

        // Combinar y eliminar duplicados basados en el ID del post
        const allPosts = [...postsFromTags, ...postsFromSearch];
        const uniquePosts = Array.from(
          new Map(allPosts.map(post => [post.id, post])).values()
        );

        // Ordenar por relevancia (primero los que coinciden en el título)
        const sortedPosts = uniquePosts.sort((a, b) => {
          if (a.matchedBy === 'title' && b.matchedBy !== 'title') return -1;
          if (a.matchedBy !== 'title' && b.matchedBy === 'title') return 1;
          return 0;
        });

        const total = Math.ceil(sortedPosts.length / 3);
        setTotalPages(total);

        // Paginar los resultados
        const startIndex = (page - 1) * 3;
        const paginatedPosts = sortedPosts.slice(startIndex, startIndex + 3);

        setPosts(paginatedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    const getPaginationRange = () => {
      const range = [];
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, currentPage + 2);

      if (end - start < 4) {
        if (start === 1) end = Math.min(totalPages, 5);
        else if (end === totalPages) start = Math.max(1, totalPages - 4);
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }

      return range;
    };


const handlePageChange = (page) => {
  if (page < 1 || page > totalPages) {
    setErrorMessage(`There are not enough pages, the maximum is: ${totalPages}`);
    return;
  }
  setErrorMessage('');
  setCurrentPage(page);
  setInputPage(page);
  fetchPosts(page);
};

const handleGoToPage = () => {
  const pageNumber = parseInt(inputPage);
  if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
    handlePageChange(pageNumber);
  } else {
    setErrorMessage(`There are not enough pages, the maximum is: ${totalPages}`);
  }
};

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleGoToPage();
  }
};

useEffect(() => {
  fetchPosts(currentPage);
}, [currentPage]);

  return (
    <div className='container-1'>
      <div className='container-2'>
      <div className="flex justify-center w-5/6 mx-auto">
      <div className="flex w-full max-w-5/6 items-center">
{/* Botón de Filtros */}
<button
              className="btn h-10 w-40 text-white border-gray-700 bg-gray-700 hover:bg-gradient-to-r hover:from-[#0DE6CD] hover:to-[#63E61D] flex items-center justify-center space-x-2"
              onClick={toggleModal}
            >
    <svg
      className="h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 4h18M3 12h18M3 20h18"
      />
    </svg>
    <span>Filters</span>
  </button>

  {/* Input de búsqueda */}
  <div className="custom-search h-10 w-40"> {/* Establecer un ancho fijo */}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none">
      <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.3-4.3"></path>
      </g>
    </svg>
    <input 
      type="search" 
      placeholder="Search Texture Packs or More..." 
      value={searchTerm} 
      onChange={(e) => setSearchTerm(e.target.value)}

    />
  </div>

  {/* Botón de búsqueda */}
  <button
    className="btn h10 w-40 text-white border-gray-700 bg-gray-700 hover:bg-gradient-to-r hover:from-[#0DE6CD] hover:to-[#63E61D]"
    onClick={handleSearch}
  >
    Search
  </button>
</div>

</div>

      </div>

      {/* Modal de DaisyUI - Ahora con w-5/6 en lugar de full width */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50">
          <div className="bg-base-100 text-white p-6 w-5/6 rounded-t-lg">
            <h2 className="text-lg font-semibold mb-4">Filter Options</h2>

            {/* Opciones de filtro */}
            <div className="space-y-4">
              <div>
                <label htmlFor="filter1" className="block text-sm font-medium text-gray-400">Filter 1</label>
                <select
                  id="filter1"
                  className="select w-4/6 bg-gray-800 border-gray-700 text-white"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div>
                <label htmlFor="filter2" className="block text-sm font-medium text-gray-400">Filter 2</label>
                <select
                  id="filter2"
                  className="select w-4/6 bg-gray-800 border-gray-700 text-white"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div>
                <label htmlFor="filter3" className="block text-sm font-medium text-gray-400">Filter 3</label>
                <select
                  id="filter3"
                  className="select w-4/6 bg-gray-800 border-gray-700 text-white"
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between space-x-2 mt-6">
              <button
                className="btn bg-gray-700 text-white w-1/2"
                onClick={toggleModal} // Cierra el modal
              >
                Close
              </button>
              <button
                className="btn bg-green-500 text-white w-1/2"
                onClick={toggleModal} // Aquí puedes agregar la acción de aplicar los filtros
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
{/* Contenedor para el loading y los resultados */}
<div className="relative h-[50vh] min-w-[83.333%] mt-6 flex justify-center items-center">
  {loading ? (
    <div className="flex justify-center items-center w-full h-full">
      <div className="radial-progress animate-spin" style={{ "--value": 70 }}></div>
    </div>
  ) : (
    <SearchResults posts={posts} />
  )}
</div>


{/* Paginación */}
<div className="flex flex-wrap justify-center items-center mt-6 gap-2">
  {/* Icono para ir a la primera página */}
  <button
    onClick={() => handlePageChange(1)}
    className={`btn btn-sm ${currentPage === 1 ? 'btn-disabled' : ''}`}
    disabled={currentPage === 1}
  >
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 17l-5-5 5-5M7 17l-5-5 5-5"
      />
    </svg>
  </button>

  {/* Icono para ir a la página anterior */}
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    className={`btn btn-sm ${currentPage === 1 ? 'btn-disabled' : ''}`}
    disabled={currentPage === 1}
  >
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>

{/* Mostrar las páginas cercanas */}
<div className="join">
  {getPaginationRange().map(page => (
    <input
      key={page}
      type="radio"
      name="pagination-options"
      aria-label={page}
      className={`join-item btn btn-square ${currentPage === page ? 'btn-active' : ''}`}
      checked={currentPage === page}
      onChange={() => handlePageChange(page)} // Cambiar a la página seleccionada
    />
  ))}
</div>


  {/* Icono para ir a la página siguiente */}
  <button
    onClick={() => handlePageChange(currentPage + 1)}
    className={`btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : ''}`}
    disabled={currentPage === totalPages}
  >
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>

  {/* Icono para ir a la última página */}
  <button
    onClick={() => handlePageChange(totalPages)}
    className={`btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : ''}`}
    disabled={currentPage === totalPages}
  >
    <svg
      className="h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 17l5-5-5-5M17 17l5-5-5-5"
      />
    </svg>
  </button>

  {/* Input para ir a una página específica */}
  <input
  type="number"
  value={inputPage}
  onChange={(e) => setInputPage(parseInt(e.target.value))}
  onKeyDown={handleKeyPress}
  className="custom-input"
  min="1"
  max={totalPages}
/>
</div>




  {/* Mostrar mensaje de error si el número de página es inválido */}
  {errorMessage && (
    <div className="mt-4 text-red-500 text-center">
      {errorMessage}
    </div>
  )}
</div>
  );
};

export default PaginationR;
