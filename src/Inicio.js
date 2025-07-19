import React from 'react';
import { motion } from 'framer-motion';

function Inicio() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '20px', textAlign: 'center' }}
    >
      <h2>Página de Inicio</h2>
      <p>Bienvenido a mi sitio web personal. Aquí encontrarás una mezcla de mis pasiones y creaciones.</p>
    </motion.div>
  );
}

export default Inicio;