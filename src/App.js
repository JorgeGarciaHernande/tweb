import './App.css';
import { motion } from 'framer-motion';
import keybladeLogo from './keyblade.png'; // <--- ¡Añade esta línea!


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Aquí usa tu imagen importada */}
        <img src={keybladeLogo} className="App-logo" alt="Logo Keyblade" style={{ height: '150px', marginBottom: '20px' }} />

        <h1>¡Bienvenido a Mi Página Web Personal!</h1>
        <p>Explora lo que podemos crear con React y animaciones.</p>

        <motion.button
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.2, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => alert('¡Me has hecho clic!')}
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
          ¡Haz Clic y Anímate!
        </motion.button>

        <p style={{ marginTop: '30px', fontSize: '0.9rem' }}>
          Desarrollado con ❤️ en React
        </p>

      </header>
    </div>
  );
}

export default App;