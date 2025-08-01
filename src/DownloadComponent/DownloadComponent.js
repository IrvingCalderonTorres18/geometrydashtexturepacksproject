import React, { useState, useEffect, useRef } from 'react';
import EntryCard from './EntryCard';
import DownloadZone from './DownloadZone';
import LanguageSwitcherButton from './LanguageSwitcherButton';
import VideoSwitcher from './VideoSwitcher';

const DownloadComponent = () => {

  const [showVersions, setShowVersions] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

  const [postId, setPostId] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para el idioma del video
  const [currentVideo, setCurrentVideo] = useState('en'); // o 'es' según tu preferencia

  const videoEn = "https://www.youtube.com/embed/_sarWpGyzh0";
  const videoEs = "https://www.youtube.com/embed/LJrjK42-T7g";
  const hasEnglish = !!videoEn;
  const hasSpanish = !!videoEs;
  const hasBoth = hasEnglish && hasSpanish;
  const hasAny = hasEnglish || hasSpanish;

  useEffect(() => {
    if (typeof window !== "undefined" && window.WP_REACT_DATA?.postId) {
      setPostId(window.WP_REACT_DATA.postId);
    }
  }, []);

  useEffect(() => {
    if (!postId) return;
    const fetchRelatedPosts = async () => {
      try {
        const postResponse = await fetch(`/wp-json/wp/v2/posts/${postId}`);
        if (!postResponse.ok) throw new Error("Error al obtener el post actual");
        const postData = await postResponse.json();
        const categories = postData.categories;
        if (!categories || categories.length === 0) return;
        const categoryId = categories[0];
        const relatedResponse = await fetch(
          `/wp-json/wp/v2/posts?categories=${categoryId}&exclude=${postId}&_embed`
        );
        const relatedData = await relatedResponse.json();
        setRelatedPosts(relatedData);
      } catch (error) {
        // Error handling
      } finally {
        setLoading(false);
      }
    };
    fetchRelatedPosts();
  }, [postId]);

  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const iframeWrapperRef = useRef(null);
  const headerRef = useRef(null);
  const [leftColumnHeight, setLeftColumnHeight] = useState(0);
  const [rightColumnHeight, setRightColumnHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(0);

  const cardHeight = 332; //Recuerda que es la altura total de la card + el gap de 20px
  const cardSpacing = 0;

  const videoRecommendations = [
    {
      image: "https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg",
      title: "Emilixito Texture Pack",
      author: "Soluble",
      rating: 3.5,
      views: "15K",
      downloads: "1.2K"
    },
    {
      image: "https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg",
      title: "Ultimate GD Mix Texture Pack 1000 Icons Extreme Pack Edition",
      author: "Juniper",
      rating: 4,
      views: "21K",
      downloads: "2.1K"
    },
    {
      image: "https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg",
      title: "Rabbit Texture Pack",
      author: "Soluble",
      rating: 4,
      views: "45K",
      downloads: "3.8K"
    },
    {
      image: "https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg",
      title: "Diamond GD Texture Pack",
      author: "Soluble & More",
      rating: 4,
      views: "13K",
      downloads: "980"
    },
    {
      image: "https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg",
      title: "FenixCore Texture Pack",
      author: "Soluble & MaxGD",
      rating: 4,
      views: "33K",
      downloads: "2.9K"
    },
        {
      image: "https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg",
      title: "FenixCore Texture Pack",
      author: "Soluble & MaxGD",
      rating: 4,
      views: "33K",
      downloads: "2.9K"
    },
        {
      image: "https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg",
      title: "FenixCore Texture Pack",
      author: "Soluble & MaxGD",
      rating: 4,
      views: "33K",
      downloads: "2.9K"
    },
        {
      image: "https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg",
      title: "FenixCore Texture Pack",
      author: "Soluble & MaxGD",
      rating: 4,
      views: "33K",
      downloads: "2.9K"
    }
  ];

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (leftColumnRef.current && headerRef.current) {
        const leftHeight = leftColumnRef.current.clientHeight;
        const headerH = headerRef.current.clientHeight;
        setLeftColumnHeight(leftHeight);
        setHeaderHeight(headerH);
        setRightColumnHeight(leftHeight);
      }
    });
    if (leftColumnRef.current) {
      observer.observe(leftColumnRef.current);
    }
    return () => {
      if (leftColumnRef.current) {
        observer.unobserve(leftColumnRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const availableHeight = leftColumnHeight;
    let cardsFit = 0;
    let reason = '';
    if (availableHeight <= headerHeight) {
      reason = 'No hay suficiente altura disponible para mostrar las cards.';
    } else {
      const usableHeight = availableHeight - headerHeight;
      cardsFit = Math.max(0, Math.floor(usableHeight / (cardHeight + cardSpacing)));
      if (cardsFit < videoRecommendations.length) {
        const nextTotal = (cardsFit + 1) * (cardHeight + cardSpacing) + headerHeight;
        reason = `Si se imprimiera una card más: (${cardsFit + 1} * (${cardHeight} + ${cardSpacing})) + altura del header (${headerHeight}px) = ${nextTotal}px, pero la altura disponible es de ${availableHeight}px, por eso no se puede imprimir más.`;
      } else {
        reason = 'Se pueden mostrar todas las cards disponibles.';
      }
    }
    setCardsToShow(cardsFit);
  }, [leftColumnHeight, headerHeight]);

  // Función para cambiar el idioma
  const handleSwitch = () => {
    setCurrentVideo(prev => (prev === 'en' ? 'es' : 'en'));
  };

  // Si solo hay español, fuerza el idioma a 'es'
  useEffect(() => {
    if (!hasEnglish && hasSpanish) setCurrentVideo('es');
    if (hasEnglish && !hasSpanish) setCurrentVideo('en');
  }, [hasEnglish, hasSpanish]);

  return (
    <div className="w-full max-w-[2560px] mx-auto min-w-0 grid grid-cols-1 md:grid-cols-[1fr_350px] gap-5 items-stretch">
      {/* Columna Izquierda */}
      <div className="grid gap-5 min-w-0" ref={leftColumnRef}>
        {/* Row 1 */}
        <DownloadZone />

        {/* Row 2: Video solo si hay alguno */}
        {hasAny && (
          <VideoSwitcher
            videoEn={videoEn}
            videoEs={videoEs}
            currentVideo={hasBoth ? currentVideo : hasEnglish ? 'en' : 'es'}
          />
        )}

        {/* Row 3: Botón solo si hay ambos */}
        {hasBoth && (
          <LanguageSwitcherButton
            currentVideo={currentVideo}
            hasEnglish={hasEnglish}
            hasSpanish={hasSpanish}
            onSwitch={handleSwitch}
          />
        )}

        {/* Row 3 */}
        <div className="rounded-[15px] border-2 border-transparent p-5 min-h-[100px]">
          <div className="text-white font-bold text-base mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
            Tutorial: Creando un Grid con CSS
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#7dff00] to-[#00ffff] flex-shrink-0"></div>
            <div className="flex-1">
              <div className="text-white font-bold text-[0.95rem]">Canal de Desarrollo Web</div>
              <div className="flex gap-2 text-[0.8rem] text-[#aaa] mt-1">
                <span><i className="fas fa-eye"></i> 245K visualizaciones</span>
                <span><i className="fas fa-calendar"></i> Hace 2 semanas</span>
                <span><i className="fas fa-thumbs-up"></i> 22K</span>
              </div>
            </div>
          </div>
        </div>
        {/* Row 4 */}
        <div className="rounded-[15px] border-2 border-transparent p-5 bg-[#111] min-h-[100px]">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#7dff00] to-[#00ffff] bg-clip-text text-transparent mb-2">
            Otro Contenedor
          </h2>
          <p className="text-white">Este es un ejemplo de una nueva sección en la columna izquierda, similar a row-1.</p>
        </div>
        {/* Row 5 */}
        <div className="rounded-[15px] border-2 border-transparent p-5 bg-[#111] min-h-[400px]">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#7dff00] to-[#00ffff] bg-clip-text text-transparent mb-2">
            Otro Contenedor
          </h2>
          <p className="text-white">Este es un ejemplo de una nueva sección en la columna izquierda, similar a row-1.</p>
        </div>
        {/* Row 6 */}
        <div className="rounded-[15px] border-2 border-transparent p-5 bg-[#111] min-h-[300px]">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#7dff00] to-[#00ffff] bg-clip-text text-transparent mb-2">
            Otro Contenedor
          </h2>
          <p className="text-white">Este es un ejemplo de una nueva sección en la columna izquierda, similar a row-1.</p>
        </div>
        {/* Row 7 */}
        <div className="rounded-[15px] border-2 border-transparent p-5 bg-[#111] min-h-[250px]">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#7dff00] to-[#00ffff] bg-clip-text text-transparent mb-2">
            Otro Contenedor
          </h2>
          <p className="text-white">Este es un ejemplo de una nueva sección en la columna izquierda, similar a row-1.</p>
        </div>
      </div>
  

  {/* Columna Derecha */}
  <div
    className="flex flex-col items-center justify-center gap-5 p-5 rounded-[15px] border-2 border-transparent bg-[#111] min-w-0 max-w-full overflow-hidden"
    style={{ maxWidth: '350px', boxSizing: 'border-box' }}
    ref={rightColumnRef}
  >
    <div className="w-full" ref={headerRef}>
      <h3 className="text-xl font-bold bg-gradient-to-r from-[#7dff00] to-[#00ffff] bg-clip-text text-transparent mb-1">
        Videos recomendados
      </h3>
      <p className="text-white">Contenido adicional aquí si lo deseas</p>
    </div>
    <div className="flex flex-col gap-8 w-full items-center justify-center">
      {videoRecommendations.slice(0, cardsToShow).map((video, index) => (
        <EntryCard
          key={index}
          image={video.image}
          title={video.title}
          author={video.author}
          rating={video.rating}
          views={video.views}
          downloads={video.downloads}
          onClick={() => alert(`Has hecho click en: ${video.title}`)}
        />
      ))}
    </div>
  </div>
    </div>
  );
};

export default DownloadComponent;
