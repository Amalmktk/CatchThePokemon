import { motion, AnimatePresence } from 'framer-motion';

const GameArea = ({ pokemon, handleCatch, position }) => {
  return (
    <AnimatePresence>
      <motion.div
        key={pokemon?.name}
        style={{
          position: 'absolute',
          top: position.top,
          left: position.left,
          cursor: 'pointer'
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1.4 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        onClick={() => handleCatch(pokemon)}>
        <img src={pokemon?.image} alt={pokemon?.name} width="100" />
        <p style={{ textTransform: 'capitalize', marginTop: '-15px' }}>
          {pokemon?.name?.toLowerCase()}
        </p>
      </motion.div>
    </AnimatePresence>
  );
};

export default GameArea;
