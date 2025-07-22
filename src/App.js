import './App.css';
import { motion } from 'framer-motion';
import keybladeLogo from './keyblade.png';
import React, { useState, useEffect } from 'react';

// --- ¡IMPORTAMOS EL COMPONENTE Gallery! ---
import Gallery from './Galeria'; // <--- ASEGÚRATE QUE ESTA LÍNEA ESTÉ AQUÍ

// =========================================================
// ¡GALERÍA 1: "Cosas que aprendí y me gustan de ti" !
// =========================================================
const galeriaContenido_Aprendi = [
  {
    idFoto: 'dante-gif', // ID para conectar con la música de esta galería
    imagen: 'https://i.imgur.com/9AqmSIY.gif',
    titulo: 'Dante - Resiliencia',
    descripcion: 'De ti he aprendido la resiliencia, cómo afrontar cualquier situación con una sonrisa y seguir adelante, incluso en los momentos más difíciles.',
  },
  {
    idFoto: 'hack', // ID para conectar
    imagen: 'https://i.imgur.com/wfdz7xY.jpeg',
    titulo: 'Programación - Pasión',
    descripcion: 'Tu pasión por lo que haces me inspira a ser mejor. Me gusta cómo te entregas a tus intereses con tanta dedicación y alegría.',
  },
  // Añade más ítems para esta galería aquí
];

const listaMusica_Aprendi = [
  {
    id: 'm1_aprendi',
    nombre: 'Devil May Cry', // Canción para la primera galería
    archivo: '/audio/Devil May Cry.mp3',
    idFoto: 'dante-gif',
  },
  {
    id: 'm2_aprendi',
    nombre: 'Hackers', // Otra canción para la primera galería
    archivo: '/audio/Hackers.mp3',
    idFoto: 'hack',
  },
  // Añade más canciones para esta galería
];

// =========================================================
// ¡GALERÍA 2: "Detalles de mí que me gustaría que sepas"!
// =========================================================
const galeriaContenido_Detalles = [
  {
    idFoto: 'kiminidotoke-ending', // ID para conectar
    imagen: 'https://i.imgur.com/FcRj5Sn.jpeg',
    titulo: 'Kimi ni Todoke - Sensibilidad',
    descripcion: 'A veces soy más sensible de lo que muestro. Las historias y las emociones me conmueven profundamente, al igual que los pequeños detalles de la vida.',
  },
  {
    idFoto: 'otaku-hobby', // Nuevo ID, asegúrate de tener la imagen y música
    imagen: 'https://i.imgur.com/ejemplo_otaku.jpeg', // <--- ¡CAMBIA ESTA IMAGEN!
    titulo: 'Mi Mundo Otaku - Mi Refugio',
    descripcion: 'Mis hobbies "nerd" son una parte fundamental de quien soy. En ellos encuentro confort, inspiración y una forma de desconectar del mundo.',
  },
  // Añade más ítems para esta galería aquí
];

const listaMusica_Detalles = [
  {
    id: 'm1_detalles',
    nombre: 'Kiminidotoke Ending',
    archivo: '/audio/kiminidotoke ending.mp3',
    idFoto: 'kiminidotoke-ending',
  },
  {
    id: 'm2_detalles',
    nombre: 'Melodía Reflexiva',
    archivo: '/audio/otra_reflexiva.mp3', 
    idFoto: 'otaku-hobby',
  },
];

// =========================================================
// ¡GALERÍA 3: "Lo que siento por ti"!
// =========================================================
const galeriaContenido_Sentimientos = [
  {
    idFoto: 'corazon-flor', // Nuevo ID
    imagen: 'https://i.imgur.com/ejemplo_corazon.jpeg', // <--- ¡CAMBIA ESTA IMAGEN!
    titulo: '',
    descripcion: '',
  },
  {
    idFoto: 'futuro-compartido', // Nuevo ID
    imagen: 'https://i.imgur.com/ejemplo_futuro.jpeg', // <--- ¡CAMBIA ESTA IMAGEN!
    titulo: '',
    descripcion: '',
  },
  // Añade más ítems para esta galería aquí
];

const listaMusica_Sentimientos = [
  {
    id: 'm1_sentimientos',
    nombre: 'Balada Profunda', // Canción para la tercera galería
    archivo: '/audio/balada_profunda.mp3', // <--- ¡CAMBIA ESTA CANCIÓN!
    idFoto: 'corazon-flor',
  },
  {
    id: 'm2_sentimientos',
    nombre: 'Nuestra Melodía', // Otra canción para la tercera galería
    archivo: '/audio/nuestra_melodia.mp3', // <--- ¡CAMBIA ESTA CANCIÓN!
    idFoto: 'futuro-compartido',
  },
  // Añade más canciones para esta galería
];


function App() {
  // === ESTADO ÚNICO PARA FORZAR LA ACTUALIZACIÓN DE LOS CRONÓMETROS ===
  const [currentTime, setCurrentTime] = useState(Date.now());

  // === FECHAS DE INICIO DE LOS CRONÓMETROS (¡AJUSTA ESTAS FECHAS A EVENTOS PASADOS REALES!) ===
  // Formato ISO (más seguro): YYYY-MM-DDTHH:mm:ssZ
  // Z significa UTC. Para tu zona (CST = UTC-6), a tu hora local le SUMAS 6 horas para obtener UTC.
  // Ejemplo: Hoy es Lunes, 21 de Julio de 2025, 4:05 PM CST (hora actual)
  // 4:05 PM CST = 22:05 UTC
  const FECHA_INICIO_HABLAR = new Date('2025-05-04T23:30:00Z').getTime(); // 4 de Mayo, 6:30 PM CST
  const FECHA_INICIO_LLAMADA = new Date('2025-06-07T04:18:00Z').getTime(); // 6 de Junio, 10:18 PM CST
  const FECHA_INICIO_OTAKUFEST = new Date('2025-06-10T22:27:00Z').getTime(); // 10 de Junio, 4:27 PM CST

  // === FUNCIÓN PARA CALCULAR Y FORMATEAR TIEMPO CRONÓMETRO ===
  // Recibe la fecha de inicio y el momento actual (currentTime)
  const formatCronometro = (fechaInicio, momentoActual) => {
    const diferencia = momentoActual - fechaInicio;

    if (diferencia < 0) {
      return (
        <>
          <span>00</span><span className="unit">D</span>
          <span>00</span><span className="unit">H</span>
          <span>00</span><span className="unit">M</span>
          <span>00</span><span className="unit">S</span>
        </>
      );
    }

    const segundosTotales = Math.floor(diferencia / 1000);
    const minutosTotales = Math.floor(segundosTotales / 60);
    const horasTotales = Math.floor(minutosTotales / 60);
    const diasTotales = Math.floor(horasTotales / 24);

    const formatNum = (num) => (num < 10 ? '0' + num : num);

    return (
      <>
        <span>{formatNum(diasTotales)}</span><span className="unit">D</span>
        <span>{formatNum(horasTotales % 24)}</span><span className="unit">H</span>
        <span>{formatNum(minutosTotales % 60)}</span><span className="unit">M</span>
        <span>{formatNum(segundosTotales % 60)}</span><span className="unit">S</span>
      </>
    );
  };

  // === useEffect para actualizar el estado 'currentTime' cada segundo ===
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000); // Cada 1000 milisegundos (1 segundo)

    // Limpieza: detiene el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // El array vacío [] asegura que este efecto se ejecuta solo una vez al inicio

  // NOTA: Toda la lógica de handleClick, cancionActual, audioRef, contenidoAMostrar
  // se ha movido al componente Gallery. Aquí ya no se gestiona directamente.

  return (
    <div className="App">
      <header className="App-header">
        {/* Logo principal */}
        <img
          src={keybladeLogo}
          className="App-logo"
          alt="Logo Keyblade"
          style={{ height: '150px', marginBottom: '20px' }}
        />

        <h1>¡Un Mensaje Secreto Para Ti!</h1> {/* <--- TÍTULO DE CONFESIÓN */}
        <p>
          He creado este pequeño espacio para compartir algunas cosas que he sentido y pensado.<br/>
          Espero que lo explores con calma y corazón abierto.
        </p>

        {/* ========================================================= */}
        {/* ¡GALERÍA 1: "Cosas que aprendí y me gustan de ti"! */}
        {/* ========================================================= */}
        <h2 className="gallery-section-title">Cosas que aprendí y me gustan de ti</h2>
        <Gallery galleryItems={galeriaContenido_Aprendi} musicList={listaMusica_Aprendi} />

        {/* ========================================================= */}
        {/* ¡GALERÍA 2: "Detalles de mí que me gustaría que sepas"! */}
        {/* ========================================================= */}
        <h2 className="gallery-section-title">Detalles de mí que me gustaría que sepas</h2>
        <Gallery galleryItems={galeriaContenido_Detalles} musicList={listaMusica_Detalles} />

        {/* ========================================================= */}
        {/* ¡GALERÍA 3: "Lo que siento por ti"! */}
        {/* ========================================================= */}
        <h2 className="gallery-section-title">lo que siento por ti</h2>
        <Gallery galleryItems={galeriaContenido_Sentimientos} musicList={listaMusica_Sentimientos} />

        {/* ========================================================= */}
        {/* ¡CONTADORES CRONÓMETRO CON ESTILO DIGITAL! */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="counters-container"
        >
          <h2 className="counter-main-title">Momentos que Atesoro</h2> {/* Título para el bloque de contadores */}
          {/* Contador para "Desde que empezamos a hablar" */}
          <div className="counter-item">
            <p className="counter-title">Desde que empezamos a hablar:</p>
            <div className="digital-cronometer-display">
              {formatCronometro(FECHA_INICIO_HABLAR, currentTime)}
            </div>
          </div>

          {/* Contador para "Desde nuestra primera llamada" */}
          <div className="counter-item">
            <p className="counter-title">Desde nuestra primera llamada:</p>
            <div className="digital-cronometer-display">
              {formatCronometro(FECHA_INICIO_LLAMADA, currentTime)}
            </div>
          </div>

          {/* Contador para "Desde OtakuFest" */}
          <div className="counter-item">
            <p className="counter-title">Desde OtakuFest:</p>
            <div className="digital-cronometer-display">
              {formatCronometro(FECHA_INICIO_OTAKUFEST, currentTime)}
            </div>
          </div>
        </motion.div>
        {/* --- FIN CONTADORES --- */}

        <p style={{ marginTop: '30px', fontSize: '0.9rem' }}>
          Desarrollado con ❤️ por Jorge
        </p>

      </header>
    </div>
  );
}

export default App;