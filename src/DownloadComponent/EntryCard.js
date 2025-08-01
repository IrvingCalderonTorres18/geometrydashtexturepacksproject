import React from 'react';

function EntryCard({ image, title, author, rating = 4, views, downloads, onClick }) {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="fas fa-star"></i>
        ))}
        {hasHalf && <i className="fas fa-star-half-alt"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="far fa-star"></i>
        ))}
      </>
    );
  };

  // Evita que los botones propaguen el click al card
  const stopPropagation = (e) => e.stopPropagation();

  // Altura fija de la card (ejemplo: 300px)
  const CARD_HEIGHT = 300;
  const IMAGE_HEIGHT = Math.round(CARD_HEIGHT * 0.5625); // 16:9 ratio

  return (
    <div
      className="w-full flex flex-col bg-[#111] border border-transparent rounded-[15px] overflow-hidden transition-transform duration-200 hover:-translate-y-1"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        height: `${CARD_HEIGHT}px`,
        minHeight: `${CARD_HEIGHT}px`,
        maxHeight: `${CARD_HEIGHT}px`,
      }}
    >
      {/* Imagen 16:9 con altura fija */}
      <div className="relative w-full flex-shrink-0" style={{ height: `${IMAGE_HEIGHT}px` }}>
        <img
          src={image}
          alt="Thumbnail"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="flex-1 p-2 flex flex-col justify-between gap-2">
        <div className="text-base font-bold text-white overflow-hidden text-ellipsis whitespace-nowrap text-left">
          {title}
        </div>
        <div className="text-xs text-white mb-1 text-left">By {author}</div>
        
        {/* Estrellas más pequeñas */}
        <div className="flex items-center gap-1 mb-1 text-[18px] text-yellow-400">
          {renderStars()}
        </div>

        <div className="flex gap-1 mt-1">
          <button
            className="flex-1 px-2 py-1 rounded bg-[#333] text-white text-xs cursor-pointer"
            onClick={stopPropagation}
          >
            {views || 'vistas'}
          </button>
          <button
            className="flex-1 px-2 py-1 rounded bg-[#333] text-white text-xs cursor-pointer"
            onClick={stopPropagation}
          >
            {downloads || 'descargas'}
          </button>
          <button
            className="flex-1 px-2 py-1 rounded bg-gradient-to-r from-[#7dff00] to-[#00ffff] text-black text-xs font-semibold cursor-pointer"
            onClick={stopPropagation}
          >
            view
          </button>
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
