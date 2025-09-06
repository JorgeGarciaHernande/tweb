// =======================================================
// === TODO EN UN SOLO ARCHIVO: App.js + Gallery.js + CSS ===
// =======================================================

import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react';

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
    imagen: '/ac.png', // Correcto: apunta a la carpeta public
    titulo: 'Tofu multifacética',
    descripcion: 'Me encanta como te vistes todos tus estilos desde muy girly hasta algo gotico me encantanta tambien como te maquillas como te arreglas las pestañas como todo te luce bien descubri que estudiaste diseño de modas y me fascino ',
  },
  {
    idFoto: 'autenticidad',
    imagen: '/tn.jpeg', // Correcto: apunta a la carpeta public
    titulo: 'MaryJoe detras de tofu',
    descripcion: 'Descubri a la chica sensible la que carga con sus traumas la que disfruta de cosas sencillas la que se burla cuando alguien le pasa algo per despues de eso te acercas ayudar o como olvidar a los 15 gatitos que alimentas',
  },
];

const galeriaContenido_Detalles = [
 {
    idFoto: 'mi razon de ser yo',
    imagen: 'https://i.imgur.com/8iyXZVN.png',
    titulo: 'Por que soy como soy ',
    descripcion: 'yo atribuyo como soy gracia a las cosas  que veia de niño almenos en parte cientifica que considero que hay en mi donde yo dije quuiero dedicarme a la ciencia fue cuando vi jimmy neutron sonara algo ridiculo pero de muy pequeño quise ser como el pedi sets de quimica y fisica de regalo y desde ese momento se me da bien la ciencia y pues toda mi vida hasta el momento de hoy considero que si he tenido el talento olimpiadas de conocimiento, torneos de ajedrez,concursos de robotica,HACKTHONS, la programacion llego a gracias a un gran profe que vio que se me daba bien todo lo logico pero esa ya es otra historia'
  },
  {
    idFoto: 'mi yo del futuro',
    imagen: 'https://i.imgur.com/g4Tfli1.png',
    titulo: 'Como me imagino en el futuro',
    descripcion: 'Quiero estudiar una maestria en ciencias de la computacion o ciencias de datos por que me encanta todo lo que se puede hacer o aprender con el big data una infinidad de datos para descubrir cosas o patrones datos frios como pueden ser los NPHARD me puedo clavar horas tratando de resolver o entender por que pasan esas cosas , me gustaria trabajar como investigador ya sea de manera publica publicando todo el conocimiento para el acceso de todos,o en una empresa donde me den libertad para buscar como hacer mas eficientemente las cosas',
  },
  {
    idFoto: 'mis hobbies',
    imagen: 'https://i.imgur.com/af2CKAa.png',
    titulo: 'mi pequeño gustito',
    descripcion: 'Una de las cosas que mas me gusta es jugar juegos simples puedo pasar horas con musica o algun podcast jugando juegos de memoria muscular como lo puedo ser tetris o pacman call of duty zombies  siendo un rato para mi y  mis ideas',
  },
];

const galeriaContenido_Sentimientos = [
  {
    idFoto: 'Edward & Winry',
    imagen: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ25pYmpkbDg5NndkenJjamJkZmVxaHkyYWRhNG4yNzNvaHlmdGRnayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YLK81inwdXriHZa7d0/giphy.gif',
    titulo: 'Lo que siento...',
    descripcion: 'Cuando hablo contigo siento que el corazon me late por mil cuando estamos hablando viendo anime o jugando no disfruto los silencios por que me encanta escuchar tu voz o tu risa',
  },
  {
    idFoto: 'sesion',
    imagen: '/sesion.jpg', // Correcto: apunta a la carpeta public
    titulo: 'Ese día...',
    descripcion: 'Cuando tuvimos la sesion no se si me notaste un poco tenso o tal vez hasta algo nervioso es que no podia creer lo bien que lucias y no podia parar de apreciar todos los detalles simplemente no podia evitarlo',
  },
  {
    idFoto: 'ash',
    imagen: 'https://i.pinimg.com/736x/74/ab/0e/74ab0e443899d085685150dc42a912ea.jpg',
    titulo: 'Me encantas',
    descripcion: 'Me encanta mucho de ti tus bromas algo tontitas como te obsesionas con tus cantantes como me albureabas no podia evitar reirme como no te daba verguenza sollozar cuando veiamos banana fish como no tenias reparo en burlarte de mi por errores en el genshin y yo por dentro me moria de pena, cuando me sentia insegura con las fotos no dudaste mucho para aconsejarme',
  },
  {
    idFoto: 'confesion',
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
    const formatDays = (n) => n;

    return <><span>{formatDays(d)}</span><span className="unit">D</span><span>{format(h % 24)}</span><span className="unit">H</span><span>{format(m % 60)}</span><span className="unit">M</span><span>{format(s % 60)}</span><span className="unit">S</span></>;
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

 /* --- ESTILOS GENERALES (Mobile-First) --- */
 body {
   margin: 0;
   font-family: 'Poppins', sans-serif;
   background: radial-gradient(ellipse at center, #2e2c34, #121212);
   color: #e0e0e0;
   overflow-x: hidden;
 }
 .App {
   text-align: center;
   padding: 15px; 
 }
 .App-header {
   background-color: rgba(24, 22, 28, 0.75);
   backdrop-filter: blur(10px);
   max-width: 1000px;
   margin: 0 auto;
   padding: 25px;
   border-radius: 16px;
   box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
   border: 1px solid rgba(255, 255, 255, 0.18);
 }
 .App-header h1 {
   color: #d8b6ff;
   font-family: 'Playfair Display', serif;
   font-size: 2rem;
   letter-spacing: 0.1em;
   text-shadow: 0 0 12px rgba(216, 182, 255, 0.6);
 }
 .App-header p {
   color: #c0c0c0;
   line-height: 1.7;
   max-width: 700px;
   margin: 15px auto;
   font-size: 0.95rem;
 }
 .App-logo {
   height: 120px;
   margin-bottom: 20px;
   filter: drop-shadow(0 0 10px rgba(216, 182, 255, 0.5));
 }
 .gallery-section-title {
   margin-top: 50px;
   margin-bottom: 25px;
   color: #d8b6ff;
   font-family: 'Playfair Display', serif;
   font-weight: 700;
   font-size: 1.5rem;
   text-shadow: 0 0 8px rgba(216, 182, 255, 0.5);
 }

 /* --- ESTILOS DE LA GALERÍA --- */
 .gallery-container {
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
   width: 100%; 
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
   /* El slide ahora no tiene fondo, solo es un contenedor */
 }
 .slide-image { width: 100%; height: auto; display: block; }
 
 /* ============================================================ */
 /* === ✨ AQUÍ ESTÁ LA MAGIA PARA ARREGLAR EL TEXTO ✨ === */
 /* ============================================================ */
 .slide-description {
    /* Quitamos el posicionamiento absoluto para que se ponga debajo */
    background: #2a282f; /* Le damos un fondo sólido */
    padding: 20px;
    box-sizing: border-box;
    color: #f0f0f0;
    text-align: left; /* Alineamos a la izquierda para mejor lectura */
 }

 .slide-title {
   margin: 0 0 10px 0; /* Aumentamos el margen inferior */
   font-size: 1.2rem;
   color: #d8bfd8;
   font-family: 'Playfair Display', serif;
 }

 .slide-description p { 
   margin: 0; 
   font-size: 0.95rem; /* Hacemos el texto un poco más grande */
   line-height: 1.7;   /* Aumentamos el espacio entre líneas */
 }
 /* ============================================================ */
 
 .nav-arrow {
   position: absolute;
   /* Ajustamos la posición para que quede centrada en la imagen */
   top: 40%; 
   transform: translateY(-50%);
   background-color: rgba(0, 0, 0, 0.5);
   color: white; border: none;
   font-size: 1.5rem;
   cursor: pointer; z-index: 10;
   transition: all 0.3s ease;
   width: 40px; height: 40px;
   border-radius: 50%;
   display: flex; align-items: center; justify-content: center;
 }
 .nav-arrow:hover { background-color: rgba(216, 182, 255, 0.3); }
 .left-arrow { left: 5px; }
 .right-arrow { right: 5px; }

 /* --- ESTILOS MEJORADOS DE LOS CRONÓMETROS --- */
 .counters-container {
   padding: 20px 0;
   margin: 50px auto;
 }
 .counter-item {
   margin-bottom: 30px;
   padding-bottom: 30px;
   border-bottom: 1px solid rgba(216, 182, 255, 0.2);
 }
 .counter-item:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
 
 .counter-title {
   font-size: 1rem;
   color: #e0e0e0;
   font-family: 'Poppins', sans-serif;
   font-weight: 300;
   margin-bottom: 15px;
 }

 .digital-cronometer-display {
   font-family: 'Poppins', monospace;
   font-size: 1.8rem;
   font-weight: 400;
   color: #e6dcf0;
   padding: 10px 12px;
   border-radius: 10px;
   text-shadow: 0 0 5px #c9a4de, 0 0 10px #c9a4de;
   display: flex;
   justify-content: center;
   align-items: baseline;
   border: 1px solid rgba(216, 182, 255, 0.3);
   margin-top: 15px;
   transition: all 0.3s ease;
   gap: 0;
 }
 .digital-cronometer-display:hover {
   border-color: rgba(217, 182, 255, 0.7);
   box-shadow: 0 0 15px rgba(216, 182, 255, 0.2);
 }
 .digital-cronometer-display .unit {
   font-size: 0.7rem;
   color: #c9a4de;
   opacity: 0.8;
   font-weight: 300;
   margin-left: 3px;
 }
 .digital-cronometer-display span.unit + span {
    margin-left: 15px; 
 }
 
 /* =========================================================
    === MEDIA QUERY PARA PANTALLAS GRANDES (PC) ===
    ========================================================= */
 @media (min-width: 768px) {
    .App-header { padding: 40px; }
    .App-header h1 { font-size: 2.5rem; }
    .App-logo { height: 150px; }
    .gallery-section-title { font-size: 1.8rem; }

    /* En PC, volvemos a poner el texto sobre la imagen porque hay más espacio */
    .slide-description {
        position: absolute;
        bottom: 0; left: 0; right: 0;
        padding: 20px;
        background: rgba(10, 10, 10, 0.85);
        backdrop-filter: blur(5px);
        max-height: 60%; 
        overflow-y: auto; 
        text-align: left;
    }
    .slide-title { font-size: 1.4rem; }
    .slide-description p { font-size: 1rem; line-height: 1.6; }
    
    .nav-arrow {
        top: 50%;
        font-size: 2rem;
        width: 50px; 
        height: 50px;
    }
    .left-arrow { left: -25px; }
    .right-arrow { right: -25px; }
    
    .counter-title { font-size: 1.2rem; }
    .digital-cronometer-display { font-size: 2.5rem; }
    .digital-cronometer-display .unit { font-size: 0.8rem; margin-left: 5px; }
    .digital-cronometer-display span.unit + span { margin-left: 20px; }
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
            <h2 className="gallery-section-title">Momentos que Atesoro</h2>
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