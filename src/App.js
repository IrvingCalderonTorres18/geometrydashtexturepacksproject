// src/App.js

import './App.css';
import SearchComponent from './SearchComponent';
import GdColorPalette from './GDColorPalette/GdColorPalette';
import DownloadComponent from './DownloadComponent/DownloadComponent';
import ShadowDOM from 'react-shadow';
function App() {
  const path = window.location.pathname;

  return (
    <div className="App">
      <header className="App-header">
        {path === '/search/' && <SearchComponent />}
        {path === '/gd-color-palette/' && <GdColorPalette />}
        {path !== '/search/' && path !== '/gd-color-palette/' && <DownloadComponent/>}
      </header>
    </div>
    /**
    * * Para renderizar es esta sección, el componente que quieras colocalo dentro del header y 
    * * te imprimirá en localhost:3000 lo que desees ver en tiempo real
    */

    /*
    <SearchComponent/> //Componente de búsqueda
    <GdColorPalette/> //Componente de paleta de colores
    <DownloadComponent/> //Componente de descarga
    */
    /**
    * * Esta sección es para hacer un npm run build con el gd color palette y el search component
    */
    /*
      /* <div className="App">
        {path === '/search/' && <SearchComponent />}
        {path === '/gd-color-palette/' && <GdColorPalette />}
      </div>
    */
    /**
    * * Esta sección es para hacer un npm run build con el gd color palette, el search component y el download component
    * * Ya viene incluida la regla para que download solo se imprima en las entradas individuales
    * * y no en la búsqueda o en la paleta de colores
    */
    /*
        {path === '/search/' && <SearchComponent />}
        {path === '/gd-color-palette/' && <GdColorPalette />}
        {path !== '/search/' && path !== '/gd-color-palette/' && <DownloadComponent/>}
    */
  );
}

export default App;
