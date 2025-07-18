import './App.css';
import { motion } from 'framer-motion';
import keybladeLogo from './keyblade.png';
import React, { useState, useRef } from 'react'; // Asegúrate de importar 'useRef'

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
  // Añade más imágenes aquí si tienes
];

// =========================================================
// ¡TU LISTA DE MÚSICA!
// =posición del 'archivo' apunta correctamente a tu MP3 en public/audio/
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
    archivo: '/audio/Hackers.mp3', // Nombre del archivo MP3
    idFoto: 'hack', // Conexión con la imagen de Programación
  },
];

function App() {
  // Estados
  const [indiceContenidoActual, setIndiceContenidoActual] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cancionActual, setCancionActual] = useState(null); // Seguiremos usando esto para mostrar el nombre
  const audioRef = useRef(null); // Referencia al elemento <audio>

  // =========================================================
  // ¡FUNCIÓN handleClick UNIFICADA (IMAGEN Y MÚSICA)!
  // =========================================================
  const handleClick = () => {
    // === Lógica para SELECCIONAR MÚSICA al azar (copiada de handlePlayMusic) ===
    if (listaMusica.length === 0) {
      alert("No hay canciones en la lista.");
      return;
    }

    const randomIndexMusica = Math.floor(Math.random() * listaMusica.length);
    const cancionSeleccionada = listaMusica[randomIndexMusica];
    setCancionActual(cancionSeleccionada); // Actualiza el estado de la canción actual

    // 2. Busca la imagen en galeriaContenido que tenga el mismo 'idFoto' que la canción seleccionada
    const imagenAsociada = galeriaContenido.find(
      (img) => img.idFoto === cancionSeleccionada.idFoto
    );

    // 3. Si se encuentra una imagen asociada, actualiza el estado de la galería
    if (imagenAsociada) {
      const indiceParaMostrar = galeriaContenido.findIndex(
        (img) => img.idFoto === imagenAsociada.idFoto
      );
      if (indiceParaMostrar !== -1) {
        setIndiceContenidoActual(indiceParaMostrar); // Actualiza el estado de la imagen de la galería
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

    // 4. Reproducir la canción
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
  }; // <--- FIN DE handleClick

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
        {/* ¡AHORA SOLO UN BOTÓN QUE MUESTRA IMAGEN Y REPRODUCE MÚSICA! */}
        {/* ========================================================= */}
        <motion.button
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick} // <--- ¡Este botón ahora hace TODO!
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
          {/* El texto del botón ahora puede reflejar si ya hay música sonando */}
          {cancionActual ? `Ver Siguiente: ${cancionActual.nombre}` : 'Iniciar Experiencia'}
        </motion.button>

        {/* ========================================================= */}
        {/* ¡EL BOTÓN DE MÚSICA SEPARADO SE ELIMINA DE AQUÍ!          */}
        {/* ========================================================= */}

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