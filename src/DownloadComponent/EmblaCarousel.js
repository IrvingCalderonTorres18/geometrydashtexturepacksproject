import React, { useCallback, useState, useEffect } from 'react'
import { DotButton } from './EmblaCarouselDotButton'
import { PrevButton, NextButton } from './EmblaCarouselArrowButtons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'

const imageTitles = [
  'Golden Texture Pack',
  'Diamond Texture Pack',
  'Emilixito',
  'Npesta Texture Pack',
    'Golden Texture Pack',
  'Diamond Texture Pack',
  'Emilixito',
  'Npesta Texture Pack',
  

]
const imageLinks = [
  'http://localhost:10004/wp-content/uploads/2025/03/maxresdefault-59.jpg',
  'http://localhost:10004/wp-content/uploads/2025/03/maxresdefault-64.jpg',
  'http://localhost:10004/wp-content/uploads/2025/04/Emilixito.png',
  'https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg',
    'http://localhost:10004/wp-content/uploads/2025/03/maxresdefault-59.jpg',
  'http://localhost:10004/wp-content/uploads/2025/03/maxresdefault-64.jpg',
  'http://localhost:10004/wp-content/uploads/2025/04/Emilixito.png',
  'https://i.ytimg.com/vi/bT-_uEFS2t4/maxresdefault.jpg',
]
const slides = imageLinks

const autoplayOptions = {
  delay: 5000,
  stopOnInteraction: false,
  stopOnMouseEnter: false // Lo controlamos manualmente
}

const EmblaCarousel = (props) => {
  const options = props.options

  // Carousel principal
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)])
  // Carousel fullscreen (loop: true)
  const [fullscreenRef, fullscreenApi] = useEmblaCarousel({ loop: true })

  // Índice del carousel principal
  const [mainIndex, setMainIndex] = useState(0)
  // Índice del carousel fullscreen (independiente)
  const [fullscreenIndex, setFullscreenIndex] = useState(0)
  // Estado fullscreen
  const [fullscreen, setFullscreen] = useState(false)

  // Estado para controlar si el autoplay está en pausa (definitivo)
  const [autoplayPaused, setAutoplayPaused] = useState(false)
  // Estado para saber si el mouse está sobre el carousel
  const [isMouseOver, setIsMouseOver] = useState(false)
  const [showHint, setShowHint] = useState(false)

  // Mostrar hint al entrar en fullscreen (solo PC)
  useEffect(() => {
    if (fullscreen && !/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      setShowHint(true)
      const timeout = setTimeout(() => setShowHint(false), 3500)
      return () => clearTimeout(timeout)
    } else {
      setShowHint(false)
    }
  }, [fullscreen])

  // Sincroniza el índice de fullscreen al abrir el modal
  useEffect(() => {
    if (fullscreen && fullscreenApi) {
      fullscreenApi.scrollTo(mainIndex, true)
      setFullscreenIndex(mainIndex)
    }
  }, [fullscreen, fullscreenApi, mainIndex])

  // Sincroniza el índice principal al cerrar el modal
  useEffect(() => {
    if (!fullscreen && emblaApi) {
      emblaApi.scrollTo(fullscreenIndex, true)
      setMainIndex(fullscreenIndex)
      setIsMouseOver(false) // <-- Añade esto para restaurar el comportamiento del mouse
    }
  }, [fullscreen, emblaApi, fullscreenIndex])

  // Actualiza el índice principal cuando se mueve el carousel principal
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setMainIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi])

  // Actualiza el índice de fullscreen cuando se mueve el carousel fullscreen
  useEffect(() => {
    if (!fullscreenApi) return
    const onSelect = () => setFullscreenIndex(fullscreenApi.selectedScrollSnap())
    fullscreenApi.on('select', onSelect)
    onSelect()
    return () => fullscreenApi.off('select', onSelect)
  }, [fullscreenApi])

  // Permitir salir de fullscreen con la tecla ESC
  useEffect(() => {
    if (!fullscreen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreen])

  // Permitir controlar el carousel fullscreen con las flechas del teclado
  useEffect(() => {
    if (!fullscreen) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        fullscreenApi && fullscreenApi.scrollPrev()
      }
      if (e.key === 'ArrowRight') {
        fullscreenApi && fullscreenApi.scrollNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreen, fullscreenApi])

  // Controla el autoplay según el estado global de pausa y mouse
  useEffect(() => {
    if (!emblaApi) return
    const autoplay = emblaApi.plugins && emblaApi.plugins().autoplay
    if (!autoplay) return
    if (fullscreen || autoplayPaused || isMouseOver) {
      autoplay.stop()
      return
    }
    // Solo activa autoplay si NO está en fullscreen
    if (!fullscreen && !autoplayPaused && !isMouseOver) {
      autoplay.play()
    }
  }, [autoplayPaused, emblaApi, isMouseOver, fullscreen])

  // Cuando se entra/sale de fullscreen, solo cambia autoplay si no está pausado globalmente
  useEffect(() => {
    if (!emblaApi) return
    const autoplay = emblaApi.plugins && emblaApi.plugins().autoplay
    if (!autoplay) return
    if (autoplayPaused) {
      autoplay.stop()
      return
    }
    if (!fullscreen && !isMouseOver) {
      autoplay.play()
    }
    if (fullscreen) {
      autoplay.stop()
    }
  }, [fullscreen, emblaApi, autoplayPaused, isMouseOver])

  // Reactiva autoplay automáticamente al salir de fullscreen si no está pausado
  useEffect(() => {
    if (!fullscreen && emblaApi) {
      const autoplay = emblaApi.plugins && emblaApi.plugins().autoplay
      // Solo activa autoplay si NO está en fullscreen
      if (autoplay && !autoplayPaused && !fullscreen) {
        autoplay.play()
      }
    }
  }, [fullscreen, emblaApi, autoplayPaused])

  // Mouse enter/leave: solo cambia estado momentáneo
  const handleMouseEnter = () => setIsMouseOver(true)
  const handleMouseLeave = () => setIsMouseOver(false)

    // Guarda la posición de scroll antes de entrar a fullscreen
  const scrollYRef = React.useRef(0)
  // Bloquear el scroll del body cuando está el modal fullscreen
  useEffect(() => {
    if (fullscreen) {
      // Guarda la posición actual
      scrollYRef.current = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${scrollYRef.current}px`
    } else {
      // Restaura estilos
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      // Restaura la posición de scroll
      window.scrollTo(0, scrollYRef.current)
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [fullscreen])

  // --- Controles prev/next y dots para cada carousel ---
  const prev = () => {
    if (fullscreen && fullscreenApi) fullscreenApi.scrollPrev()
    else if (emblaApi) emblaApi.scrollPrev()
  }
  const next = () => {
    if (fullscreen && fullscreenApi) fullscreenApi.scrollNext()
    else if (emblaApi) emblaApi.scrollNext()
  }
  const goTo = (idx) => {
    if (fullscreen && fullscreenApi) fullscreenApi.scrollTo(idx)
    else if (emblaApi) emblaApi.scrollTo(idx)
  }

useEffect(() => {
  if (!fullscreen || !emblaApi) return

  const autoplay = emblaApi.plugins && emblaApi.plugins().autoplay
  if (!autoplay) return

  // Intervalo para vigilar el autoplay mientras esté en fullscreen
  const interval = setInterval(() => {
    if (autoplay.isPlaying && typeof autoplay.isPlaying === 'function') {
      if (autoplay.isPlaying()) {
        autoplay.stop()
      }
    } else if (autoplay.playing) {
      // fallback para otras versiones
      if (autoplay.playing) {
        autoplay.stop()
      }
    }
  }, 200)

  // Detener autoplay inmediatamente al entrar en fullscreen
  autoplay.stop()

  return () => clearInterval(interval)
}, [fullscreen, emblaApi])
  
  // --- Render ---
  return (
    <section
      className="embla"
      style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Botón de pausa/play y fullscreen */}
      <div style={{
        position: 'absolute',
        bottom: '4.5rem',
        right: '1rem',
        zIndex: 21,
        display: 'flex',
        gap: '0.5rem',
        transition: 'opacity 0.4s'
      }}>
        {/* Botón pausa/play */}
        <button
          className="embla__icon-btn embla__icon-btn--pauseplay"
          aria-label={autoplayPaused ? "Reanudar autoplay" : "Pausar autoplay"}
          onClick={e => {
            if (!emblaApi) return
            const autoplay = emblaApi.plugins && emblaApi.plugins().autoplay
            if (!autoplay) return
            if (autoplayPaused) {
              autoplay.play()
              setAutoplayPaused(false)
            } else {
              autoplay.stop()
              setAutoplayPaused(true)
            }
            const tooltip = e.currentTarget.querySelector('.pauseplay-tooltip')
            if (tooltip) e.currentTarget.removeChild(tooltip)
          }}
          onMouseEnter={e => {
            const prevTooltip = e.currentTarget.querySelector('.pauseplay-tooltip')
            if (prevTooltip) e.currentTarget.removeChild(prevTooltip)
            const tooltip = document.createElement('div')
            tooltip.innerText = autoplayPaused ? 'Play' : 'Pause'
            tooltip.style.position = 'absolute'
            tooltip.style.left = '50%'
            tooltip.style.transform = 'translateX(-50%)'
            tooltip.style.bottom = '2.5rem'
            tooltip.style.background = 'rgba(0, 0, 0, 0.6)'
            tooltip.style.color = '#fff'
            tooltip.style.padding = '0.2rem 0.5rem'
            tooltip.style.borderRadius = '0.4rem'
            tooltip.style.fontSize = '0.7rem'
            tooltip.style.fontWeight = 'bold'
            tooltip.style.whiteSpace = 'nowrap'
            tooltip.style.boxShadow = '0 2px 8px #0003'
            tooltip.className = 'pauseplay-tooltip'
            e.currentTarget.appendChild(tooltip)
          }}
          onMouseLeave={e => {
            const tooltip = e.currentTarget.querySelector('.pauseplay-tooltip')
            if (tooltip) e.currentTarget.removeChild(tooltip)
          }}
        >
          {autoplayPaused ? (
            // Play icon
            <svg viewBox="-3 0 28 28" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <g fill="#ffffff">
                  <path d="M440.415,583.554 L421.418,571.311 C420.291,570.704 419,570.767 419,572.946 L419,597.054 C419,599.046 420.385,599.36 421.418,598.689 L440.415,586.446 C441.197,585.647 441.197,584.353 440.415,583.554" transform="translate(-419.000000, -571.000000)"></path>
                </g>
              </g>
            </svg>
          ) : (
            // Pause icon
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.163 3.819C5 4.139 5 4.559 5 5.4v13.2c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .656-.656c.163-.32.163-.74.163-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C8.861 3 8.441 3 7.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zm9 0C14 4.139 14 4.559 14 5.4v13.2c0 .84 0 1.26.164 1.581a1.5 1.5 0 0 0 .655.655c.32.164.74.164 1.581.164h.2c.84 0 1.26 0 1.581-.163a1.5 1.5 0 0 0 .655-.656c.164-.32.164-.74.164-1.581V5.4c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656C17.861 3 17.441 3 16.6 3h-.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.655.656z" fill="#ffffff"></path>
              </g>
            </svg>
          )}
        </button>
        {/* Botón fullscreen */}
        <button
          className="embla__icon-btn embla__icon-btn--fullscreen"
          onClick={() => setFullscreen(true)}
          aria-label="Ver imagen en pantalla completa"
          onMouseEnter={e => {
            const tooltip = document.createElement('div')
            tooltip.innerText = 'Fullscreen'
            tooltip.style.position = 'absolute'
            tooltip.style.left = '50%'
            tooltip.style.transform = 'translateX(-50%)'
            tooltip.style.bottom = '2.5rem'
            tooltip.style.background = 'rgba(0, 0, 0, 0.6)'
            tooltip.style.color = '#fff'
            tooltip.style.padding = '0.2rem 0.5rem'
            tooltip.style.borderRadius = '0.4rem'
            tooltip.style.fontSize = '0.7rem'
            tooltip.style.fontWeight = 'bold'
            tooltip.style.whiteSpace = 'nowrap'
            tooltip.style.boxShadow = '0 2px 8px #0003'
            tooltip.className = 'fullscreen-tooltip'
            e.currentTarget.appendChild(tooltip)
          }}
          onMouseLeave={e => {
            const tooltip = e.currentTarget.querySelector('.fullscreen-tooltip')
            if (tooltip) e.currentTarget.removeChild(tooltip)
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H3.5C4.05228 9.5 4.5 9.05228 4.5 8.5V4.5H8.5C9.05228 4.5 9.5 4.05228 9.5 3.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H4Z" fill="#ffffff"></path>
              <path d="M20 1.5C21.3807 1.5 22.5 2.61929 22.5 4V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H20.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H20Z" fill="#ffffff"></path>
              <path d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H20.5C19.9477 14.5 19.5 14.9477 19.5 15.5V19.5H15.5C14.9477 19.5 14.5 19.9477 14.5 20.5V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H20Z" fill="#ffffff"></path>
              <path d="M1.5 20C1.5 21.3807 2.61929 22.5 4 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V20.5C9.5 19.9477 9.05228 19.5 8.5 19.5H4.5V15.5C4.5 14.9477 4.05228 14.5 3.5 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V20Z" fill="#ffffff"></path>
            </g>
          </svg>
        </button>
      </div>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((src, index) => (
            <div
              className={`embla__slide${mainIndex === index ? ' is-selected' : ''}`}
              key={index}
            >
              <div className="embla__parallax__layer">
                <img
                  className="embla__slide__img embla__parallax__img"
                  src={src}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        {slides.length < 10 ? (
          <div
            className="embla__buttons"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              gap: '1rem'
            }}
          >
            <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'flex-start' }}>
              <PrevButton onClick={prev} />
            </div>
            <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
              <div className="embla__dots">
                {slides.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => goTo(index)}
                    className={'embla__dot'.concat(
                      index === mainIndex ? ' embla__dot--selected' : ''
                    )}
                  />
                ))}
              </div>
            </div>
            <div style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'flex-end' }}>
              <NextButton onClick={next} />
            </div>
          </div>
        ) : (
          <div className="embla__buttons">
            <PrevButton onClick={prev} />
            <div
              style={{
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '1rem',
                minWidth: '70px',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {mainIndex + 1} of {slides.length}
            </div>
            <NextButton onClick={next} />
          </div>
        )}
      </div>

      {/* Modal de pantalla completa */}
      {fullscreen && (
        <div
          className="embla__fullscreen-modal fade-in-scale"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            opacity: 0.75,
            transform: 'scale(1.25)'
          }}
        >
          {/* Mensaje UX/UI de ayuda */}
          {showHint && (
            <div
              className="hidden-mobile"
              style={{
                position: 'fixed',
                left: '1rem',
                bottom: '0.75rem',
                zIndex: 10020,
                pointerEvents: 'none',
                userSelect: 'none',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <span
                style={{
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  borderRadius: '0.5rem',
                  padding: '0.35rem 0.9rem',
                  boxShadow: '0 2px 12px #000a',
                  letterSpacing: '0.01em',
                  transition: 'opacity 0.7s',
                  opacity: showHint ? 0.8 : 0,
                  animation: 'fadeOutHint 0.7s 2.8s forwards'
                }}
              >
                Press <span style={{ color: '#7dff00', fontWeight: 700 }}>ESC</span> to exit&nbsp;|&nbsp;
                Use <span style={{ color: '#00ffff', fontWeight: 700 }}>←</span> <span style={{ color: '#00ffff', fontWeight: 700 }}>→</span> arrows to navigate
              </span>
            </div>
          )}

          {/* Botón ver imagen completa */}
          <button
            className="embla__icon-btn embla__icon-btn--viewimage"
            aria-label="Ver imagen en nueva pestaña"
            style={{
              position: 'absolute',
              top: '8rem',
              right: '17rem',
            }}
            onClick={() => window.open(slides[fullscreenIndex])}
          >
            <svg fill="#ffffff" viewBox="0 0 1024 1024" width="24" height="24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M960 704c-35.346 0-64 28.654-64 64v64c0 35.346-28.654 64-64 64H192c-35.346 0-64-28.654-64-64V192c0-35.346 28.654-64 64-64h64c35.346 0 64-28.654 64-64S291.346 0 256 0h-64C85.961 0 0 85.961 0 192v640c0 106.039 85.961 192 192 192h640c106.039 0 192-85.961 192-192v-64c0-35.346-28.654-64-64-64z"></path>
                <path d="M1023.876 51.52c0-1.92 0-3.84-1.6-5.44a63.957 63.957 0 00-1.92-6.4 63.973 63.973 0 00-3.2-6.4s0-3.2-2.56-4.8a63.989 63.989 0 00-17.6-17.6L991.876 8l-6.08-3.2-6.72-1.92h-5.44A64.028 64.028 0 00959.876 0h-384c-35.346 0-64 28.654-64 64s28.654 64 64 64h229.44l-370.56 370.88c-25.007 25.007-25.007 65.553 0 90.56s65.553 25.007 90.56 0l370.56-370.88V448c0 35.346 28.654 64 64 64s64-28.654 64-64V64c.407-4.15.407-8.33 0-12.48z"></path>
              </g>
            </svg>
          </button>
          {/* Botón cerrar */}
          <button
            className="close-btn"
            style={{
              position: 'absolute',
              top: '2rem',
              right: '11rem',
              zIndex: 10001
            }}
            onClick={() => setFullscreen(false)}
          >
            <div class="hoverEffect"><div></div></div>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon-close">
              <path fill="#ffffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path>
            </svg>
          </button>
          {/* Título */}
          <h2
            style={{
              color: '#7dff00',
              marginBottom: '1.5rem',
              fontSize: '2rem',
              fontWeight: 800,
              textAlign: 'center'
            }}
          >
            {imageTitles[fullscreenIndex]}
          </h2>
          {/* Imagenes */}
          <div className="embla fullscreen" style={{ width: '100%', maxWidth: '100%' }}>
            <div className="embla__viewport" ref={fullscreenRef}>
              <div className="embla__container">
                {slides.map((src, index) => (
                  <div
                    className="embla__slide__fullscreen"
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={src}
                      alt={imageTitles[index]}
                      style={{
                        width: '80%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        borderRadius: '1rem',
                        background: '#111',
                        boxShadow: '0 4px 32px #000',
                        display: 'block'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Flechas superpuestas globales */}
            <button
              className="arrow fullscreen-arrow fullscreen-arrow--left hidden-mobile"
              style={{
                position: 'fixed',
                left: '4vw',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                zIndex: 10002,
                cursor: 'pointer',
                padding: 0,
              }}
              onClick={() => fullscreenApi && fullscreenApi.scrollPrev()}
              aria-label="Anterior"
            >
              <div className="arrow-box">
                <span className="arrow-elem">
                  <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                    ></path>
                  </svg>
                </span>
                <span className="arrow-elem">
                  <svg viewBox="0 0 46 40">
                    <path
                      d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                    ></path>
                  </svg>
                </span>
              </div>
            </button>
            <button
              className="arrow fullscreen-arrow fullscreen-arrow--right hidden-mobile"
              style={{
                position: 'fixed',
                right: '4vw',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                zIndex: 10002,
                cursor: 'pointer',
                padding: 0,
              }}
              onClick={() => fullscreenApi && fullscreenApi.scrollNext()}
              aria-label="Siguiente"
            >
              <div className="arrow-box" style={{ flexDirection: 'row-reverse' }}>
                <span className="arrow-elem arrow-elem--right">
                  <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                    ></path>
                  </svg>
                </span>
                <span className="arrow-elem arrow-elem--right">
                  <svg viewBox="0 0 46 40">
                    <path
                      d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                    ></path>
                  </svg>
                </span>
              </div>
            </button>
          </div>
          {/* Controles de carousel en pantalla completa */}
          <div
            className="embla__controls"
            style={{
              width: '100%',
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {slides.length < 10 ? (
              <div
                className="embla__buttons"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  gap: '1rem'
                }}
              >
                {/* Flecha izquierda SOLO en móvil */}
                <div className="show-mobile" style={{ display: 'none' }}>
                  <PrevButton onClick={() => fullscreenApi && fullscreenApi.scrollPrev()} />
                </div>
                <div style={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
                  <div className="embla__dots">
                    {slides.map((_, index) => (
                      <DotButton
                        key={index}
                        onClick={() => fullscreenApi && fullscreenApi.scrollTo(index)}
                        className={'embla__dot'.concat(
                          index === fullscreenIndex ? ' embla__dot--selected' : ''
                        )}
                      />
                    ))}
                  </div>
                </div>
                {/* Flecha derecha SOLO en móvil */}
                <div className="show-mobile" style={{ display: 'none' }}>
                  <NextButton onClick={() => fullscreenApi && fullscreenApi.scrollNext()} />
                </div>
              </div>
            ) : (
              <div
                style={{
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  minWidth: '70px',
                  textAlign: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {/* Flecha izquierda SOLO en móvil */}
                <div className="show-mobile" style={{ display: 'none' }}>
                  <PrevButton onClick={() => fullscreenApi && fullscreenApi.scrollPrev()} />
                </div>
                {fullscreenIndex + 1} of {slides.length}
                {/* Flecha derecha SOLO en móvil */}
                <div className="show-mobile" style={{ display: 'none' }}>
                  <NextButton onClick={() => fullscreenApi && fullscreenApi.scrollNext()} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

export default EmblaCarousel
//En un futuro ya cuando esté en el servidor, el mensaje de ShowHint controlarlo para que solo aparezca la primera vez que se entra a fullscreen, y no cada vez que se abre el modal.