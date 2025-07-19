import './App.css';
import { motion } from 'framer-motion';
import keybladeLogo from './keyblade.png';
// Asegúrate de que 'useState', 'useRef' y ¡'useEffect' estén importados!
import React, { useState, useRef, useEffect } from 'react';

// =========================================================
// ¡TU GALERÍA DE IMÁGENES!
// =========================================================
const galeriaContenido = [
  {
    idFoto: 'dante-gif', // ID para conectar
    imagen: 'https://i.imgur.com/9AqmSIY.gif',
    titulo: 'Dante',
    descripcion: 'Dante es de mis personajes favoritos, no importa que tan mal se encuentre, simplemente hace un chiste y continúa con su pesar.',
  },
  {
    idFoto: 'hack', // Otro ID para otra imagen
    imagen: 'https://i.imgur.com/wfdz7xY.jpeg',
    titulo: 'Programación',
    descripcion: 'La programación es una de mis pasiones, me encanta crear cosas nuevas y resolver problemas. He programado desde que tenía 13 años, una de mis pasiones.',
  },
];

// =========================================================
// ¡TU LISTA DE MÚSICA!
// =========================================================
const listaMusica = [
  {
    id: 'm1',
    nombre: 'Devil May Cry',
    archivo: '/audio/Devil May Cry.mp3', // Asegúrate de que el nombre del archivo MP3 sea exacto
    idFoto: 'dante-gif', // Conexión con la imagen de Dante
  },
  {
    id: 'm2',
    nombre: 'Hackers',
    archivo: '/audio/Hackers.mp3', // Nombre del archivo MP3
    idFoto: 'hack', // Conexión con la imagen de Programación
  },
];

function App() {
  // Estados de la galería y música
  const [indiceContenidoActual, setIndiceContenidoActual] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cancionActual, setCancionActual] = useState(null);
  const audioRef = useRef(null);

  // === ESTADOS PARA LOS CRONÓMETROS ===
  // Usaremos un único estado para forzar la actualización de todos los cronómetros
  const [currentTime, setCurrentTime] = useState(Date.now());

  // === FECHAS DE INICIO DE LOS CRONÓMETROS (¡AJUSTA ESTAS FECHAS A EVENTOS PASADOS REALES!) ===
  // Formato ISO: YYYY-MM-DDTHH:mm:ss
  // Hora actual en Ciudad Madero, Tam, MX: Sábado, 19 de julio de 2025, 2:10 PM CST
  const FECHA_INICIO_HABLAR = new Date('2025-05-04T18:30:00').getTime(); // Ejemplo: Hace ~29 días
  const FECHA_INICIO_LLAMADA = new Date('2025-06-06T22:18:00').getTime(); // Ejemplo: Hace ~8 días
  const FECHA_INICIO_OTAKUFEST = new Date('2025-06-10T14:27:00').getTime(); // Ejemplo: Hace ~1 día

  // === FUNCIÓN PARA CALCULAR Y FORMATEAR TIEMPO CRONÓMETRO ===
  // Esta función ahora recibe el 'momentoActual' (que es el currentTime actualizado cada segundo)
  const formatCronometro = (fechaInicio, momentoActual) => {
    const diferencia = momentoActual - fechaInicio; // Diferencia en milisegundos

    // Si la fecha es futura, muestra '00D00H00M00S'
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

    const formatNum = (num) => (num < 10 ? '0' + num : num); // Función auxiliar para añadir cero inicial

    // Retorna el JSX formateado para el cronómetro
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
      setCurrentTime(Date.now()); // Actualiza el estado currentTime cada segundo
    }, 1000); // Cada 1000 milisegundos (1 segundo)

    // Limpieza: detiene el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []); // El array vacío [] asegura que este efecto se ejecuta solo una vez al inicio


  // Lógica de handleClick (IMAGEN Y MÚSICA)
  const handleClick = () => {
    if (listaMusica.length === 0) {
      alert("No hay canciones en la lista.");
      return;
    }

    const randomIndexMusica = Math.floor(Math.random() * listaMusica.length);
    const cancionSeleccionada = listaMusica[randomIndexMusica];
    setCancionActual(cancionSeleccionada);

    const imagenAsociada = galeriaContenido.find(
      (img) => img.idFoto === cancionSeleccionada.idFoto
    );

    if (imagenAsociada) {
      const indiceParaMostrar = galeriaContenido.findIndex(
        (img) => img.idFoto === imagenAsociada.idFoto
      );
      if (indiceParaMostrar !== -1) {
        setIndiceContenidoActual(indiceParaMostrar);
      } else {
        setIndiceContenidoActual(null);
        console.warn(
          `ADVERTENCIA: No se encontró imagen en 'galeriaContenido' con idFoto: ${cancionSeleccionada.idFoto} para la canción "${cancionSeleccionada.nombre}".`
        );
      }
    } else {
      setIndiceContenidoActual(null);
      console.warn(
        `ADVERTENCIA: La canción "${cancionSeleccionada.nombre}" no tiene un 'idFoto' asignado o la imagen asociada no fue encontrada.`
      );
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play().catch((e) =>
        console.error(
          "Error al intentar reproducir audio (probablemente autoplay bloqueado):",
          e
        )
      );
    }
  };

  const contenidoAMostrar =
    indiceContenidoActual !== null
      ? galeriaContenido[indiceContenidoActual]
      : null;

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

        <h1>¡Bienvenido a Mi Página Web Personal!</h1>
        <p>Explora lo que podemos crear con React y animaciones.</p>

        {/* ========================================================= */}
        {/* ¡CONTADORES CRONÓMETRO CON ESTILO DIGITAL! (Directamente en App.js) */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="counters-container"
        >
          {/* Contador para "Desde que empezamos a hablar" */}
          <div className="counter-item">
            <p className="counter-title">Desde que empezamos a hablar:</p>
            <div className="digital-cronometer-display">
              {formatCronometro(FECHA_INICIO_HABLAR, currentTime)} {/* <--- ¡PASAMOS currentTime AQUÍ! */}
            </div>
          </div>

          {/* Contador para "Desde nuestra primera llamada" */}
          <div className="counter-item">
            <p className="counter-title">Desde nuestra primera llamada:</p>
            <div className="digital-cronometer-display">
              {formatCronometro(FECHA_INICIO_LLAMADA, currentTime)} {/* <--- ¡PASAMOS currentTime AQUÍ! */}
            </div>
          </div>

          {/* Contador para "Desde OtakuFest" */}
          <div className="counter-item">
            <p className="counter-title">Desde OtakuFest:</p>
            <div className="digital-cronometer-display">
              {formatCronometro(FECHA_INICIO_OTAKUFEST, currentTime)} {/* <--- ¡PASAMOS currentTime AQUÍ! */}
            </div>
          </div>
        </motion.div>
        {/* --- FIN CONTADORES --- */}

        {/* Botón unificado */}
        <motion.button
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          style={{
            padding: '15px 30px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#61dafb', // Color azul por defecto para el botón principal
            color: 'white',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          {cancionActual ? `Ver Siguiente: ${cancionActual.nombre}` : 'Iniciar Experiencia'}
        </motion.button>

        {/* Elemento de Audio oculto */}
        <audio ref={audioRef} controls style={{ display: 'none' }}>
          {cancionActual && <source src={cancionActual.archivo} type="audio/mpeg" />}
          Tu navegador no soporta el elemento de audio.
        </audio>

        {/* Sección de la galería de imágenes */}
        {contenidoAMostrar && (
          <motion.div
            key={contenidoAMostrar.idFoto}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: '40px', maxWidth: '600px', padding: '20px', border: '1px solid #61dafb', borderRadius: '10px', position: 'relative' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src={contenidoAMostrar.imagen} alt={contenidoAMostrar.titulo} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            <h2 style={{ color: '#61dafb', marginTop: '15px' }}>{contenidoAMostrar.titulo}</h2>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="image-description-tooltip"
              >
                <p>{contenidoAMostrar.descripcion}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        <p style={{ marginTop: '30px', fontSize: '0.9rem' }}>
          Desarrollado con ❤️ por Jorge
        </p>

      </header>
    </div>
  );
}

export default App;