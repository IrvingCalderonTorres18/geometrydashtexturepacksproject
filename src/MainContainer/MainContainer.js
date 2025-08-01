import React from 'react';
import './MainContainer.css';

function MainContainer() {
  return (
    <div className="main-container">
      {/* Fila 1 */}
      <div className="row">
        <div className="column left">
          <div className="card">
            <h3>Card Sencilla</h3>
            <p>Contenido de la card.</p>
          </div>
        </div>
        <div className="column right">
          <h3>Entradas Recomendadas</h3>
          <ul>
            <li><a href="#">Entrada 1</a></li>
            <li><a href="#">Entrada 2</a></li>
            <li><a href="#">Entrada 3</a></li>
          </ul>
        </div>
      </div>

      {/* Fila 2 */}
      <div className="row">
        <div className="column left">
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/pxbOR1yOGJQ"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="column right">
          <h3>Entradas Recomendadas</h3>
          <ul>
            <li><a href="#">Entrada 4</a></li>
            <li><a href="#">Entrada 5</a></li>
            <li><a href="#">Entrada 6</a></li>
          </ul>
        </div>
      </div>

      {/* Fila 3 */}
      <div className="row">
        <div className="column left">
          <div className="card">
            <h3>Redes Sociales</h3>
            <p>Síguenos en nuestras redes sociales.</p>
          </div>
        </div>
        <div className="column right">
          <h3>Entradas Recomendadas</h3>
          <ul>
            <li><a href="#">Entrada 7</a></li>
            <li><a href="#">Entrada 8</a></li>
            <li><a href="#">Entrada 9</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;