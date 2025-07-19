import './App.css';
import { motion } from 'framer-motion';
import keybladeLogo from './keyblade.png';
// Asegúrate de importar 'useState', 'useRef' y ¡'useEffect'!
import React, { useState, useRef, useEffect } from 'react';

// =========================================================
// ¡FECHAS DE INICIO PARA TUS CONTADORES!
// (Las he actualizado a un formato y hora para que cuenten desde el pasado)
// =========================================================
const FECHA_INICIO_CONTADOR_HABLAR = new Date('May 4, 2025 18:30:00 CST').getTime(); // 4 de Mayo, 6:30 PM
const FECHA_INICIO_CONTADOR_LLAMADA = new Date('June 6, 2025 22:18:00 CST').getTime(); // 6 de Junio, 10:18 PM
const FECHA_INICIO_CONTADOR_OTAKUFEST = new Date('June 10, 2025 16:20:00 CST').getTime(); // 10 de Junio, 4:20 PM

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
    archivo: '/audio/Devil May Cry.mp3',
    idFoto: 'dante-gif', // Conexión con la imagen de Dante
  },
  {
    id: 'm2',
    nombre: 'Hackers',
    archivo: '/audio/Hackers.mp3',
    idFoto: 'hack', // Conexión con la imagen de Programación
  },
];

function App() {
  // Estados
  const [indiceContenidoActual, setIndiceContenidoActual] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cancionActual, setCancionActual] = useState(null);
  const audioRef = useRef(null);

  // --- ¡NUEVOS ESTADOS PARA LOS CONTADORES! ---
  const [tiempoHablar, setTiempoHablar] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [tiempoLlamada, setTiempoLlamada] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  const [tiempoOtakuFest, setTiempoOtakuFest] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });


  // =========================================================
  // ¡HOOKS useEffect PARA CADA CONTADOR!
  // =========================================================

  // Contador para "Hablar"
  useEffect(() => {
    const actualizarContadorHablar = () => {
      const ahora = new Date().getTime();
      const diferencia = ahora - FECHA_INICIO_CONTADOR_HABLAR;

      if (diferencia < 0) {
        setTiempoHablar({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }
      const segundosTotales = Math.floor(diferencia / 1000);
      const minutosTotales = Math.floor(segundosTotales / 60);
      const horasTotales = Math.floor(minutosTotales / 60);
      const diasTotales = Math.floor(horasTotales / 24);

      setTiempoHablar({
        dias: diasTotales,
        horas: horasTotales % 24,
        minutos: minutosTotales % 60,
        segundos: segundosTotales % 60,
      });
    };
    actualizarContadorHablar();
    const intervaloId = setInterval(actualizarContadorHablar, 1000);
    return () => clearInterval(intervaloId);
  }, []); // Se ejecuta solo una vez al montar

  // Contador para "Llamada"
  useEffect(() => {
    const actualizarContadorLlamada = () => {
      const ahora = new Date().getTime();
      const diferencia = ahora - FECHA_INICIO_CONTADOR_LLAMADA;

      if (diferencia < 0) {
        setTiempoLlamada({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }
      const segundosTotales = Math.floor(diferencia / 1000);
      const minutosTotales = Math.floor(segundosTotales / 60);
      const horasTotales = Math.floor(minutosTotales / 60);
      const diasTotales = Math.floor(horasTotales / 24);

      setTiempoLlamada({
        dias: diasTotales,
        horas: horasTotales % 24,
        minutos: minutosTotales % 60,
        segundos: segundosTotales % 60,
      });
    };
    actualizarContadorLlamada();
    const intervaloId = setInterval(actualizarContadorLlamada, 1000);
    return () => clearInterval(intervaloId);
  }, []); // Se ejecuta solo una vez al montar

  // Contador para "OtakuFest"
  useEffect(() => {
    const actualizarContadorOtakuFest = () => {
      const ahora = new Date().getTime();
      const diferencia = ahora - FECHA_INICIO_CONTADOR_OTAKUFEST;

      if (diferencia < 0) {
        setTiempoOtakuFest({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }
      const segundosTotales = Math.floor(diferencia / 1000);
      const minutosTotales = Math.floor(segundosTotales / 60);
      const horasTotales = Math.floor(minutosTotales / 60);
      const diasTotales = Math.floor(horasTotales / 24);

      setTiempoOtakuFest({
        dias: diasTotales,
        horas: horasTotales % 24,
        minutos: minutosTotales % 60,
        segundos: segundosTotales % 60,
      });
    };
    actualizarContadorOtakuFest();
    const intervaloId = setInterval(actualizarContadorOtakuFest, 1000);
    return () => clearInterval(intervaloId);
  }, []); // Se ejecuta solo una vez al montar


  // =========================================================
  // ¡FUNCIÓN handleClick UNIFICADA (IMAGEN Y MÚSICA)!
  // =========================================================
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
        {/* ¡NUEVOS CONTADORES INDIVIDUALES! */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ marginTop: '20px', marginBottom: '10px', fontSize: '1.2rem', color: '#B0C4DE', textAlign: 'left', maxWidth: '400px', width: '90%' }}
        >
          <p>Desde que empezamos a hablar: <br/>
            **{tiempoHablar.dias}** días, **{tiempoHablar.horas}** horas, **{tiempoHablar.minutos}** min, **{tiempoHablar.segundos}** seg
          </p>
          <p>Desde nuestra primera llamada: <br/>
            **{tiempoLlamada.dias}** días, **{tiempoLlamada.horas}** horas, **{tiempoLlamada.minutos}** min, **{tiempoLlamada.segundos}** seg
          </p>
          <p>Desde OtakuFest: <br/>
            **{tiempoOtakuFest.dias}** días, **{tiempoOtakuFest.horas}** horas, **{tiempoOtakuFest.minutos}** min, **{tiempoOtakuFest.segundos}** seg
          </p>
        </motion.div>
        {/* --- FIN NUEVOS CONTADORES --- */}


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
            backgroundColor: '#61dafb',
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

        {/* Sección de la galería de imágenes (sin cambios en esta parte) */}
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