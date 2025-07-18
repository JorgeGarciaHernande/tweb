import './App.css';
import { motion } from 'framer-motion';
import keybladeLogo from './keyblade.png';
import React, { useState, useRef } from 'react'; // Asegúrate de importar 'useRef'

// =========================================================
// ¡TU GALERÍA DE IMÁGENES!
// Nota: Tu ID para la foto es 'idFoto', lo usaremos para la conexión.
// =========================================================
const galeriaContenido = [
  {
    idFoto: 'dante-gif', // ID que usarás para conectar
    imagen: 'https://i.imgur.com/9AqmSIY.gif',
    titulo: 'Dante',
    descripcion: 'Dante es de mis personajes favoritos, no importa que tan mal se encuentre, simplemente hace un chiste y continúa con su pesar.',
  },
  // Añade más imágenes aquí si tienes, asegurándote de que cada una tenga un 'idFoto' único
  /*
  {
    idFoto: 'otro-caballero',
    imagen: 'https://i.imgur.com/URLDeTuOtraImagen.png',
    titulo: 'Otro Caballero',
    descripcion: 'Una descripción para el otro caballero.',
  },
  */
];

// =========================================================
// ¡TU LISTA DE MÚSICA!
// Asegúrate de que 'idFoto' en CADA CANCIÓN coincida con un 'idFoto' de galeriaContenido
// =========================================================
const listaMusica = [
  {
    id: 'm1',
    nombre: 'Devil May Cry',
    archivo: '/audio/Devil May Cry.mp3', // Asegúrate de que el nombre del archivo MP3 sea exacto
    idFoto: 'dante-gif', // <--- ¡Conexión con el idFoto de la imagen de Dante!
  },
  // Si tienes más canciones, las añadirías aquí:
  /*
  {
    id: 'm2',
    nombre: 'Melodía Secreta',
    archivo: '/audio/melodia_secreta.mp3',
    idFoto: 'otro-caballero', // Conexión con el idFoto de otra imagen
  },
  */
];

function App() {
  // Estados
  const [indiceContenidoActual, setIndiceContenidoActual] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cancionActual, setCancionActual] = useState(null);
  const audioRef = useRef(null); // Referencia al elemento <audio>

  // Función para cambiar la imagen de la galería al azar (este botón aún es independiente de la música)
  const handleClick = () => {
    if (galeriaContenido.length === 0) {
      setIndiceContenidoActual(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * galeriaContenido.length);
    setIndiceContenidoActual(randomIndex);
  };

  // Función para reproducir una canción al azar Y SINCRONIZAR LA FOTO
  const handlePlayMusic = () => {
    if (listaMusica.length === 0) {
      alert("No hay canciones en la lista.");
      return;
    }

    // 1. Selecciona una canción al azar de la listaMusica
    const randomIndexMusica = Math.floor(Math.random() * listaMusica.length);
    const cancionSeleccionada = listaMusica[randomIndexMusica];
    setCancionActual(cancionSeleccionada); // Actualiza el estado de la canción actual

    // 2. Busca la imagen en galeriaContenido que tenga el mismo 'idFoto' que la canción seleccionada
    const imagenAsociada = galeriaContenido.find(
      (img) => img.idFoto === cancionSeleccionada.idFoto // <--- ¡Usamos 'idFoto' aquí!
    );

    // 3. Si se encuentra una imagen asociada, actualiza el estado de la galería
    if (imagenAsociada) {
      // Necesitamos encontrar el índice de esa imagen dentro del arreglo 'galeriaContenido'
      // para poder pasarle ese índice a 'setIndiceContenidoActual'.
      const indiceParaMostrar = galeriaContenido.findIndex(
        (img) => img.idFoto === imagenAsociada.idFoto // Busca el índice por idFoto
      );
      if (indiceParaMostrar !== -1) {
        setIndiceContenidoActual(indiceParaMostrar); // Actualiza el estado de la imagen de la galería
      } else {
        // En caso de que el idFoto de la canción no tenga una imagen asociada válida
        setIndiceContenidoActual(null); // No muestra ninguna imagen
        console.warn(
          `ADVERTENCIA: No se encontró imagen en 'galeriaContenido' con idFoto: ${cancionSeleccionada.idFoto} para la canción "${cancionSeleccionada.nombre}".`
        );
      }
    } else {
      // Si la canción no tiene 'idFoto' o no se encuentra la imagen asociada
      setIndiceContenidoActual(null); // No muestra ninguna imagen
      console.warn(
        `ADVERTENCIA: La canción "${cancionSeleccionada.nombre}" no tiene un 'idFoto' asignado o la imagen asociada no fue encontrada.`
      );
    }

    // 4. Reproducir la canción
    if (audioRef.current) {
      audioRef.current.pause(); // Pausa la actual si está sonando
      audioRef.current.load(); // Carga la nueva canción
      // Intenta reproducir y captura cualquier error (como bloqueo de autoplay)
      audioRef.current.play().catch((e) =>
        console.error(
          "Error al intentar reproducir audio (probablemente autoplay bloqueado):",
          e
        )
      );
    }
  };

  // Esta variable obtiene el objeto completo de la imagen que se debe mostrar
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

        {/* Botón para la galería de imágenes (sin música) - Este ya lo tenías */}
        <motion.button
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick} // Este botón solo cambia imágenes de forma aleatoria
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
          {contenidoAMostrar ? 'Ver Otra Imagen' : 'Mostrar Contenido Secreto'}
        </motion.button>

        {/* Botón para la música Y SINCRONIZAR FOTO */}
        <motion.button
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePlayMusic} // <--- ¡Este es el botón clave para la sincronización!
          style={{
            padding: '15px 30px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#9932CC',
            color: 'white',
            cursor: 'pointer',
            marginTop: '15px'
          }}
        >
          {cancionActual ? `Reproduciendo: ${cancionActual.nombre}` : 'Reproducir Música Aleatoria'}
        </motion.button>

        {/* Elemento de Audio oculto */}
        <audio ref={audioRef} controls style={{ display: 'none' }}>
          {cancionActual && <source src={cancionActual.archivo} type="audio/mpeg" />}
          Tu navegador no soporta el elemento de audio.
        </audio>

        {/* Sección de la galería de imágenes */}
        {contenidoAMostrar && (
          <motion.div
            key={contenidoAMostrar.idFoto} // Usamos idFoto como key aquí también
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