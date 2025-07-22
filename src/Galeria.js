import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // AnimatePresence para animaciones de salida

// Componente Gallery
// Recibe:
// - galleryItems: el arreglo de imágenes y descripciones para esta galería
// - musicList: el arreglo de música para esta galería
function Gallery({ galleryItems, musicList }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Inicia en la primera imagen (índice 0)
  const [isHovered, setIsHovered] = useState(false); // Para el tooltip de descripción
  const audioRef = useRef(null); // Ref para el elemento de audio

  // Función para reproducir la canción asociada a la imagen actual
  const playCurrentSong = (index) => {
    // Asegurarse de que haya items en la galería y que el índice sea válido
    if (galleryItems.length === 0 || index === null || index < 0 || index >= galleryItems.length) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Limpia la fuente
      }
      return;
    }

    const imagenActual = galleryItems[index];
    const cancionAsociada = musicList.find(
      (song) => song.idFoto === imagenActual.idFoto
    );

    if (cancionAsociada && audioRef.current) {
      audioRef.current.src = cancionAsociada.archivo; // Establece la fuente del audio
      audioRef.current.load(); // Carga la nueva fuente
      audioRef.current.play().catch((e) => {
        console.error("Error al intentar reproducir audio:", e);
        // Mensaje si el autoplay es bloqueado
      });
    } else if (audioRef.current) {
      audioRef.current.pause(); // Pausa si no hay canción asociada
      audioRef.current.src = ""; // Limpia la fuente
      console.warn(`No se encontró canción para la imagen con idFoto: ${imagenActual.idFoto}`);
    }
  };

  // useEffect para manejar la reproducción de música cuando cambia la imagen
  useEffect(() => {
    // Solo reproduce si la galería tiene contenido y el índice es válido
    if (galleryItems.length > 0 && currentIndex !== null) {
      playCurrentSong(currentIndex);
    }
  }, [currentIndex, galleryItems, musicList, playCurrentSong]); // <--- ¡DEPENDENCIAS CORREGIDAS AQUÍ!

  // Manejadores de las flechas de navegación
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % galleryItems.length // Vuelve al principio si llega al final
    );
    setIsHovered(false); // Cierra tooltip al cambiar
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + galleryItems.length) % galleryItems.length // Va al final si está en el principio
    );
    setIsHovered(false); // Cierra tooltip al cambiar
  };

  // Contenido de la imagen y descripción actual
  const currentItem = galleryItems.length > 0 ? galleryItems[currentIndex] : null;

  if (!currentItem) {
    return <div>No hay elementos en esta galería.</div>; // Mensaje si la galería está vacía
  }

  return (
    <motion.div
      className="gallery-container" // Tu clase CSS para el contenedor
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Botón de flecha izquierda */}
      <button className="nav-arrow left-arrow" onClick={handlePrev}>
        &#10094; {/* Carácter de flecha izquierda */}
      </button>

      {/* Animaciones de entrada/salida para la imagen y el texto */}
      <AnimatePresence mode="wait"> {/* 'mode="wait"' espera a que uno termine para que el otro empiece */}
        <motion.div
          key={currentItem.idFoto} // La clave única es VITAL para AnimatePresence
          initial={{ opacity: 0, x: 50 }} // Inicia desde la derecha, invisible
          animate={{ opacity: 1, x: 0 }} // Se mueve a su posición, visible
          exit={{ opacity: 0, x: -50 }} // Sale hacia la izquierda, invisible
          transition={{ duration: 0.3 }} // Duración de la transición
          className="gallery-content-wrapper" // Envuelve imagen y título para animar juntos
        >
          <img src={currentItem.imagen} alt={currentItem.titulo} className="gallery-image" />
          <h2 style={{ color: '#b3b3b3', marginTop: '15px' }}>{currentItem.titulo}</h2>
        </motion.div>
      </AnimatePresence>

      {/* Botón de flecha derecha */}
      <button className="nav-arrow right-arrow" onClick={handleNext}>
        &#10095; {/* Carácter de flecha derecha */}
      </button>

      {/* Tooltip de descripción */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="image-description-tooltip"
        >
          <p>{currentItem.descripcion}</p>
        </motion.div>
      )}

      {/* El elemento de audio se maneja aquí dentro del componente de galería */}
      <audio ref={audioRef} loop style={{ display: 'none' }} />
    </motion.div>
  );
}


export default Gallery;