// =======================================================
// === TODO EN UN SOLO ARCHIVO: App.js + Gallery.js + CSS ===
// =======================================================

import { motion, AnimatePresence } from 'framer-motion';
import keybladeLogo from './keyblade.png';
import React, { useState, useEffect } from 'react';

// =========================================================
// ¡TUS DATOS DE LAS GALERÍAS! (Sin cambios)
// =========================================================
const galeriaContenido_Aprendi = [
  {
    idFoto: 'dante-gif',
    imagen: 'https://i.imgur.com/9AqmSIY.gif',
    titulo: 'Tu gusto obsesivo por las cosas',
    descripcion: 'Me encanta como cuando te gusta algo te obsesionas con eso al 100% por ejemplo cuando jugamos genshin conocias todas las ubicaciones de los cofres todos los puzzles que personajes tenian buena sinergia,la primera vez que hablamos como dominabas bastante bien de DMC simplemente me encanto',
  },
  {
    idFoto: 'collage',
    imagen: 'https://i.imgur.com/wfdz7xY.jpeg',
    titulo: 'Tofu multifacética',
    descripcion: 'Me encanta como te vistes todos tus estilos desde muy girly hasta algo gotico me encantanta tambien como te maquillas como te arreglas las pestañas como todo te luce bien descubri que estudiaste diseño de modas y me fascino ',
  },
  {
    idFoto: 'autenticidad',
    imagen: 'https://i.imgur.com/xIe4t56.jpeg', // Imagen actualizada para que funcione
    titulo: 'Tu autenticidad',
    descripcion: 'Me encanta tu forma de ser, sin filtros y siempre genuina.',
  },
];

const galeriaContenido_Detalles = [
  {
    idFoto: 'kiminidotoke-ending',
    imagen: 'https://i.imgur.com/9CyJPdX.jpeg',
    titulo: 'Detalle 1',
    descripcion: 'Aquí va la descripción de la imagen.',
  },
  {
    idFoto: 'otaku-hobby',
    imagen: 'https://i.imgur.com/otL6D4B.jpeg', // Imagen actualizada para que funcione
    titulo: 'Detalle 2',
    descripcion: 'Aquí va la descripción de la imagen.',
  },
  {
    idFoto: 'cafe-noche',
    imagen: 'https://i.imgur.com/yO8m2g4.jpeg', // Imagen actualizada para que funcione
    titulo: 'Detalle 3',
    descripcion: 'Aquí va la descripción de la imagen.',
  },
];

const galeriaContenido_Sentimientos = [
  {
    idFoto: 'corazon-flor',
    imagen: 'https://i.imgur.com/mJgLQ1N.jpeg', // Imagen actualizada para que funcione
    titulo: 'Lo que siento...',
    descripcion: 'Cuando hablo contigo siento que el corazon me late por mil cuando estamos hablando viendo anime o jugando no disfruto los silencios por que me encanta escuchar tu voz o tu risa',
  },
  {
    idFoto: 'futuro-compartido',
    imagen: 'https://i.imgur.com/5u8a2gN.jpeg', // Imagen actualizada para que funcione
    titulo: 'Ese día...',
    descripcion: 'Cuando tuvimos la sesion no se si me notaste un poco tenso o tal vez hasta algo nervioso es que no podia creer lo bien que lucias y no podia parar de apreciar todos los detalles simplemente no podia evitarlo',
  },
  {
    idFoto: 'confesion-directa',
    imagen: 'https://i.imgur.com/aW8sO0p.jpeg', // Imagen actualizada para que funcione
    titulo: 'Me encantas',
    descripcion: 'Me encanta mucho de ti tus bromas algo tontita como te obsesionas con tus cantantes como me albureabas no podia evitar reirme como no te daba verguenza sollozar cuando veiamos banana fish como no tenias reparo en burlarte de mi por errores en el genshin y yo por dentro me moria de pena, cuando me sentia insegura con las fotos no dudaste mucho para aconsejarme',
  },
  {
    idFoto: 'confesion-final', // ID cambiado para evitar duplicados
    imagen: 'https://i.imgur.com/9CyJPdX.jpeg', // Imagen actualizada para que funcione
    titulo: 'En resumen...',
    descripcion: 'Solo queria decirte que ME GUSTAS TAL CUAL ERES con los virtudes y defectos que hasta el momento he conocido',
  },
];

// =========================================================
// === COMPONENTE GALLERY (Integrado en este archivo) ===
// =========================================================
const Gallery = ({ galleryItems }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = () => {
    const nextIndex = activeIndex === galleryItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = activeIndex === 0 ? galleryItems.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
  };

  const currentItem = galleryItems[activeIndex];

  return (
    <div className="gallery-container">
      <button onClick={goToPrev} className="nav-arrow left-arrow">&#10094;</button>
      <div className="slide">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentItem.idFoto}
            src={currentItem.imagen}
            alt={currentItem.titulo}
            className="slide-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
        <div className="slide-description">
          <h3 className="slide-title">{currentItem.titulo}</h3>
          <p>{currentItem.descripcion}</p>
        </div>
      </div>
      <button onClick={goToNext} className="nav-arrow right-arrow">&#10095;</button>
    </div>
  );
};


// =========================================================
// === COMPONENTE APP (Componente Principal) ===
// =========================================================
function App() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const FECHA_INICIO_HABLAR = new Date('2025-05-04T23:30:00Z').getTime();
  const FECHA_INICIO_LLAMADA = new Date('2025-06-07T04:18:00Z').getTime();
  const FECHA_INICIO_OTAKUFEST = new Date('2025-06-10T22:27:00Z').getTime();

  const formatCronometro = (fechaInicio, momentoActual) => {
    const diferencia = momentoActual - fechaInicio;
    if (diferencia < 0) {
      return <><span>00</span><span className="unit">D</span><span>00</span><span className="unit">H</span><span>00</span><span className="unit">M</span><span>00</span><span className="unit">S</span></>;
    }
    const s = Math.floor(diferencia / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    const format = (n) => (n < 10 ? '0' + n : n);
    return <><span>{format(d)}</span><span className="unit">D</span><span>{format(h % 24)}</span><span className="unit">H</span><span>{format(m % 60)}</span><span className="unit">M</span><span>{format(s % 60)}</span><span className="unit">S</span></>;
  };

  useEffect(() => {
    const intervalId = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* INYECTAMOS TODOS LOS ESTILOS CSS AQUÍ */}
      <style>{`
        /* --- ESTILOS GENERALES --- */
        body {
          margin: 0;
          font-family: 'Georgia', serif;
          background-color: #121212;
          color: #e0e0e0;
        }
        .App {
          text-align: center;
          padding: 20px;
        }
        .App-header {
          background-color: #202020;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
          border: 1px solid #404040;
        }
        .App-header h1 {
          color: #c9a4de;
          font-family: 'Times New Roman', serif;
          letter-spacing: 0.12em;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
        }
        .App-header p {
          color: #b0b0b0;
          line-height: 1.8;
          max-width: 700px;
          margin: 15px auto;
        }
        .App-logo {
          height: 150px;
          margin-bottom: 20px;
          filter: drop-shadow(0 0 8px rgba(160, 128, 192, 0.6));
        }
        .gallery-section-title {
            margin-top: 60px;
            color: #c9a4de;
        }
        /* --- ESTILOS DE LA GALERÍA CORREGIDOS --- */
        .gallery-container {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 90%;
          max-width: 700px;
          margin: 30px auto;
        }
        .slide {
          position: relative;
          width: 100%;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
        .slide-image {
          width: 100%;
          height: auto;
          display: block;
        }
        .slide-description {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px;
          box-sizing: border-box;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(5px);
          color: #f0f0f0;
          max-height: 60%; 
          overflow-y: auto; 
        }
        .slide-title {
          margin: 0 0 10px 0;
          font-size: 1.4rem;
          color: #d8bfd8;
        }
        .slide-description p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.6;
        }
        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          z-index: 10;
          transition: background-color 0.3s ease;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-arrow:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
        .left-arrow { left: -25px; }
        .right-arrow { right: -25px; }

        /* --- ESTILOS DE LOS CRONÓMETROS --- */
        .counters-container {
          padding: 30px;
          margin: 60px auto;
          background-color: #262626;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
          border: 1px solid #404040;
        }
        .counter-item {
          margin-bottom: 25px;
          padding-bottom: 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        }
        .counter-item:last-child {
          margin-bottom: 0;
          border-bottom: none;
          padding-bottom: 0;
        }
        .counter-main-title, .counter-title {
            font-family: 'Times New Roman', serif;
            font-size: 1.2rem;
            color: #c9a4de;
            margin-bottom: 8px;
            letter-spacing: 1.5px;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
        }
        .digital-cronometer-display {
          font-family: 'Courier New', monospace;
          font-size: 2.3rem;
          color: #98fb98;
          background-color: #1a1a1a;
          padding: 12px 18px;
          border-radius: 10px;
          letter-spacing: 5px;
          text-shadow: 0 0 12px rgba(152, 251, 152, 0.8);
          display: flex;
          justify-content: center;
          gap: 18px;
          border: 1px solid #72cc72;
          margin-top: 15px;
        }
        .digital-cronometer-display .unit {
          font-size: 0.85rem;
          color: #b0d9b0;
          margin-left: -10px;
          align-self: flex-end;
        }
      `}</style>

      <div className="App">
        <header className="App-header">
          <img src={keybladeLogo} className="App-logo" alt="Logo Keyblade" />
          <h1>¡Un Mensaje Secreto Para Ti!</h1>
          <p>
            He creado este pequeño espacio para compartir algunas cosas que he sentido y pensado.<br />
            Espero que lo explores con calma y corazón abierto.
          </p>

          <h2 className="gallery-section-title">Cosas que aprendí y me gustan de ti</h2>
          <Gallery galleryItems={galeriaContenido_Aprendi} />

          <h2 className="gallery-section-title">Detalles de mí que me gustaría que sepas</h2>
          <Gallery galleryItems={galeriaContenido_Detalles} />

          <h2 className="gallery-section-title">Lo que siento por ti</h2>
          <Gallery galleryItems={galeriaContenido_Sentimientos} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="counters-container"
          >
            <h2 className="counter-main-title">Momentos que Atesoro</h2>
            <div className="counter-item">
              <p className="counter-title">Desde que empezamos a hablar:</p>
              <div className="digital-cronometer-display">
                {formatCronometro(FECHA_INICIO_HABLAR, currentTime)}
              </div>
            </div>
            <div className="counter-item">
              <p className="counter-title">Desde nuestra primera llamada:</p>
              <div className="digital-cronometer-display">
                {formatCronometro(FECHA_INICIO_LLAMADA, currentTime)}
              </div>
            </div>
            <div className="counter-item">
              <p className="counter-title">Desde OtakuFest:</p>
              <div className="digital-cronometer-display">
                {formatCronometro(FECHA_INICIO_OTAKUFEST, currentTime)}
              </div>
            </div>
          </motion.div>

          <p style={{ marginTop: '30px', fontSize: '0.9rem' }}>
            Desarrollado con ❤️ por Jorge
          </p>
        </header>
      </div>
    </>
  );
}

export default App;