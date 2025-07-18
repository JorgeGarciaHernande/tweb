import './App.css';
import { motion } from 'framer-motion';
import keybladeLogo from './keyblade.png'; // Tu logo local
// Asegúrate de que esta línea esté presente para usar useState
import React, { useState } from 'react';

// =========================================================
// ¡AQUÍ ESTÁ TU GALERÍA! AFUERA Y ARRIBA DE LA FUNCIÓN App.
// =========================================================
const galeriaContenido = [ // Le cambié el nombre a 'galeriaContenido' para ser más claro
  {
    id: 1, // Identificador único
    imagen: 'https://i.imgur.com/9AqmSIY.gif', // Tu imagen GIF
    titulo: 'Dante',
    descripcion: 'Dante es de mis personajes favoritos, no importa que tan mal se encuentre, simplemente hace un chiste y continúa con su pesar.',
  },
  // Si tienes más imágenes, añádelas aquí con la misma estructura:
  /*
  {
    id: 2,
    imagen: 'https://i.imgur.com/OTRAIMAGEN2.jpg', // Reemplaza con la URL real de tu segunda imagen
    titulo: 'Nombre de la Segunda Imagen',
    descripcion: 'Descripción detallada de la segunda imagen.',
  },
  {
    id: 3,
    imagen: 'https://i.imgur.com/OTRAIMAGEN3.png', // Reemplaza con la URL real de tu tercera imagen
    titulo: 'Título de la Tercera Imagen',
    descripcion: 'Descripción de la tercera imagen.',
  },
  */
];
// =========================================================


function App() { // <--- La función App empieza aquí

  // =========================================================
  // ¡ESTADOS Y FUNCIONES QUE VAN DENTRO DE LA FUNCIÓN App!
  // =========================================================

  // Estado para guardar el índice de la imagen que se está mostrando actualmente
  // null significa que no se muestra ninguna imagen al principio
  const [indiceContenidoActual, setIndiceContenidoActual] = useState(null);

  // Estado para controlar el tooltip (si lo quieres, si no, puedes quitarlo y la lógica isHovered)
  const [isHovered, setIsHovered] = useState(false);


  // Función que se ejecuta cuando se hace clic en el botón
  const handleClick = () => {
    // Generamos un número aleatorio entre 0 y el número total de elementos en la galería - 1
    // Esto nos dará un índice válido para cualquier elemento del arreglo
    const randomIndex = Math.floor(Math.random() * galeriaContenido.length);
    // Actualizamos el estado con el nuevo índice aleatorio
    setIndiceContenidoActual(randomIndex);
  };

  // Esta variable obtiene el objeto completo (imagen, título, descripción)
  // de la galería que se debe mostrar en base al 'indiceContenidoActual'.
  // Será 'null' si no hay nada que mostrar aún.
  const contenidoAMostrar = indiceContenidoActual !== null ? galeriaContenido[indiceContenidoActual] : null;

  // =========================================================
  // ¡FIN DE ESTADOS Y FUNCIONES, EMPIEZA EL JSX (lo que se renderiza)!
  // =========================================================

  return (
    <div className="App">
      <header className="App-header">
        {/* Tu logo Keyblade */}
        <img src={keybladeLogo} className="App-logo" alt="Logo Keyblade" style={{ height: '150px', marginBottom: '20px' }} />

        <h1>¡Bienvenido a Mi Página Web Personal!</h1>
        <p>Explora lo que podemos crear con React y animaciones.</p>

        <motion.button
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick} // <--- El botón ahora llama a la función handleClick
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
          {contenidoAMostrar ? 'Ver Otra Imagen' : 'Mostrar Contenido Secreto'} {/* Texto del botón cambia */}
        </motion.button>

        {/* ========================================================= */}
        {/* ¡Aquí se muestra la imagen y descripción de la galería!   */}
        {/* ========================================================= */}
        {contenidoAMostrar && ( // Condición: Solo se muestra si 'contenidoAMostrar' no es nulo
          <motion.div
            key={contenidoAMostrar.id} // Clave única para la animación
            initial={{ opacity: 0, y: 20 }} // Animación de entrada
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginTop: '40px', maxWidth: '600px', padding: '20px', border: '1px solid #61dafb', borderRadius: '10px', position: 'relative' }}
            // Si quieres el tooltip:
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* La imagen de la galería */}
            <img src={contenidoAMostrar.imagen} alt={contenidoAMostrar.titulo} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
            {/* El título de la imagen */}
            <h2 style={{ color: '#61dafb', marginTop: '15px' }}>{contenidoAMostrar.titulo}</h2>

            {/* La descripción como tooltip (si tienes el CSS para .image-description-tooltip) */}
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

            {/* O la descripción como párrafo normal (si no quieres tooltip, borra la sección 'isHovered &&' de arriba y descomenta esta línea) */}
            {/* <p>{contenidoAMostrar.descripcion}</p> */}

          </motion.div>
        )}

        <p style={{ marginTop: '30px', fontSize: '0.9rem' }}>
          Desarrollado con ❤️ por Jorge
        </p>

      </header>
    </div>
  );
} // <--- La función App termina aquí

export default App;