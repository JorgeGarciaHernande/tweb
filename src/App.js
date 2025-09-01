// =======================================================
// === TODO EN UN SOLO ARCHIVO: App.js + Gallery.js + CSS ===
// =======================================================

import { motion, AnimatePresence } from 'framer-motion';
import corazonNeonLogo from './corazon-neon.png'; // Correctamente importado
import React, { useState, useEffect } from 'react';
import imagenCollage from './ac.png'; 
import imagenAutenticidad from './tn.jpeg';
import imagenSesion from './sesion.jpeg'; // ✨ 1. IMPORTAMOS LA NUEVA IMAGEN

// =========================================================
// ¡TUS DATOS DE LAS GALERÍAS!
// =========================================================
const galeriaContenido_Aprendi = [
  {
    idFoto: 'xiaopic',
    imagen: 'https://i.imgur.com/O9ZlWS1.jpeg',
    titulo: 'Tu gusto obsesivo por las cosas',
    descripcion: 'Me encanta como cuando te gusta algo te obsesionas con eso al 100% por ejemplo cuando jugamos genshin conocias todas las ubicaciones de los cofres todos los puzzles que personajes tenian buena sinergia,la primera vez que hablamos como dominabas bastante bien de DMC simplemente me encanto',
  },
  {
    idFoto: 'collage',
    imagen: '/ac.png', // Ruta a la carpeta public
    titulo: 'Tofu multifacética',
    descripcion: 'Me encanta como te vistes todos tus estilos desde muy girly hasta algo gotico me encantanta tambien como te maquillas como te arreglas las pestañas como todo te luce bien descubri que estudiaste diseño de modas y me fascino ',
  },
  {
    idFoto: 'autenticidad',
    imagen: '/tn.jpeg', // Ruta a la carpeta public
    titulo: 'MaryJoe detras de tofu',
    descripcion: 'Descubri a la chica sensible la que carga con sus traumas la que disfruta de cosas sencillas la que se burla cuando alguien le pasa algo per despues de eso te acercas ayudar o como olvidar a los 15 gatitos que alimentas',
  },
];

const galeriaContenido_Detalles = [
  {
    idFoto: 'kiminidotoke-ending',
    imagen: 'https://external-preview.redd.it/lets-get-ouran-high-school-host-club-back-on-track-v0-jbacr0KWkCsgp1N1HC1TZEc5VSTv9OZibdhK9xA5KEU.jpg?width=1080&crop=smart&auto=webp&s=35680b0200ac279fd666a9c26f341301ee6483d4',
    titulo: 'Nuestras Noches de Anime',
    descripcion: 'Me encantan esas noches de ver anime cuando nos viciamos a ouran o bananafish se convirtieron en mi momento favorito del ida en algunas ocasiones me da mucha risa como yo comenzaba a aventarme mis peliculas mentales de las cosas que podian pasar y tu no podias evitar reir por que el anime me contestaba mi pregunta, tal vez ya no lo hacemos tan amenudo pero te garantizo que esas noches tienen un lugar importante en mi corazon',
  },
  {
    idFoto: 'otaku-hobby',
    imagen: 'https://i.imgur.com/otL6D4B.jpeg',
    titulo: 'Compartir lo que Amamos',
    descripcion: 'Me fascina cuando me enseñas tus figuras o me hablas de los mangas que estás leyendo. Ver la pasión en tus ojos cuando hablas de lo que te gusta es una de las cosas que más me atraen de ti.',
  },
  {
    idFoto: 'cafe-noche',
    imagen: 'https://i.imgur.com/yO8m2g4.jpeg',
    titulo: 'Nuestras Pláticas Nocturnas',
    descripcion: 'Pienso en las conversaciones que hemos tenido hasta tarde. No importa de qué hablemos, el tiempo se pasa volando. Es en esos momentos tranquilos donde siento que más conectamos, y me encanta.',
  },
];

const galeriaContenido_Sentimientos = [
  {
    idFoto: 'corazon-flor',
    imagen: 'https://i.imgur.com/mJgLQ1N.jpeg',
    titulo: 'Lo que siento...',
    descripcion: 'Cuando hablo contigo siento que el corazon me late por mil cuando estamos hablando viendo anime o jugando no disfruto los silencios por que me encanta escuchar tu voz o tu risa',
  },
  {
    idFoto: 'futuro-compartido',
    imagen: '/sesion.jpeg', // Ruta a la carpeta public
    titulo: 'Ese día...',
    descripcion: 'Cuando tuvimos la sesion no se si me notaste un poco tenso o tal vez hasta algo nervioso es que no podia creer lo bien que lucias y no podia parar de apreciar todos los detalles simplemente no podia evitarlo',
  },
  {
    idFoto: 'confesion-directa',
    imagen: 'https://i.pinimg.com/736x/74/ab/0e/74ab0e443899d085685150dc42a912ea.jpg',
    titulo: 'Me encantas',
    descripcion: 'Me encanta mucho de ti tus bromas algo tontita como te obsesionas con tus cantantes como me albureabas no podia evitar reirme como no te daba verguenza sollozar cuando veiamos banana fish como no tenias reparo en burlarte de mi por errores en el genshin y yo por dentro me moria de pena, cuando me sentia insegura con las fotos no dudaste mucho para aconsejarme',
  },
  {
    idFoto: 'confesion-final',
    imagen: 'https://i.imgur.com/9CyJPdX.jpeg',
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

  const audioRef = useRef(null);

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
    
    if (audioRef.current) {
        audioRef.current.play().catch(error => {
            console.log("La reproducción automática fue bloqueada por el navegador.");
        });
    }

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <audio 
        ref={audioRef} 
        src="https://archive.org/download/from-the-start/from%20the%20start.mp3" 
        loop 
      />

      {/* INYECTAMOS TODOS LOS ESTILOS CSS AQUÍ */}
     <style>{`
  /* --- IMPORTAMOS FUENTES DE GOOGLE --- */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400&display=swap');

  /* --- ESTILOS GENERALES --- */
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background: radial-gradient(ellipse at center, #2e2c34, #121212);
    color: #e0e0e0;
    overflow-x: hidden;
  }
  .App {
    text-align: center;
    padding: 20px;
  }
  .App-header {
    background-color: rgba(24, 22, 28, 0.75);
    backdrop-filter: blur(10px);
    max-width: 1000px;
    margin: 0 auto;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  .App-header h1 {
    color: #d8b6ff;
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    letter-spacing: 0.1em;
    text-shadow: 0 0 12px rgba(216, 182, 255, 0.6);
  }
  .App-header p {
    color: #c0c0c0;
    line-height: 1.8;
    max-width: 700px;
    margin: 15px auto;
  }
  .App-logo {
    height: 150px;
    margin-bottom: 20px;
    filter: drop-shadow(0 0 10px rgba(216, 182, 255, 0.5));
  }
  .gallery-section-title {
    margin-top: 60px;
    margin-bottom: 30px;
    color: #d8b6ff;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 1.8rem;
    text-shadow: 0 0 8px rgba(216, 182, 255, 0.5);
  }
  /* --- ESTILOS DE LA GALERÍA --- */
  .gallery-container {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 90%;
    max-width: 701px;
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
  .slide-image { width: 100%; height: auto; display: block; }
  .slide-description {
    position: absolute;
    bottom: 0; left: 0; right: 0;
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
    font-family: 'Playfair Display', serif;
  }
  .slide-description p { margin: 0; font-size: 1rem; line-height: 1.6; }
  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white; border: none;
    font-size: 2rem; cursor: pointer; z-index: 10;
    transition: all 0.3s ease;
    width: 50px; height: 50px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .nav-arrow:hover { background-color: rgba(216, 182, 255, 0.3); }
  .left-arrow { left: -25px; }
  .right-arrow { right: -25px; }

  /* --- ESTILOS MEJORADOS DE LOS CRONÓMETROS --- */
  .counters-container {
    padding: 30px;
    margin: 60px auto;
    background-color: transparent;
    box-shadow: none;
    border: none;
  }
  .counter-item {
    margin-bottom: 35px;
    padding-bottom: 35px;
    border-bottom: 1px solid rgba(216, 182, 255, 0.2);
  }
  .counter-item:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
  
  .counter-main-title, .counter-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: #d8b6ff;
    margin-bottom: 15px;
    letter-spacing: 1.5px;
    text-shadow: 0 0 8px rgba(216, 182, 255, 0.5);
  }
  .counter-title {
    font-size: 1.2rem;
    color: #e0e0e0;
    font-family: 'Poppins', sans-serif;
    font-weight: 300;
  }

  .digital-cronometer-display {
    font-family: 'Poppins', monospace;
    font-size: 2.5rem;
    font-weight: 400;
    color: #e6dcf0;
    background-color: transparent;
    padding: 12px 18px;
    border-radius: 10px;
    letter-spacing: 5px;
    text-shadow: 0 0 5px #c9a4de, 0 0 10px #c9a4de;
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 18px;
    border: 1px solid rgba(216, 182, 255, 0.3);
    margin-top: 15px;
    transition: all 0.3s ease;
  }
  
  .digital-cronometer-display:hover {
    border-color: rgba(217, 182, 255, 0.7);
    box-shadow: 0 0 15px rgba(216, 182, 255, 0.2);
  }
  
  .digital-cronometer-display .unit {
    font-size: 0.8rem;
    color: #c9a4de;
    margin-left: -12px;
    opacity: 0.8;
    font-weight: 300;
  }
`}</style>
      <div className="App">
        <header className="App-header">
        <img src="/corazon-neon.png" className="App-logo" alt="Logo de Corazón Neón" />
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