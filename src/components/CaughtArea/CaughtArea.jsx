import { AnimatePresence, motion } from 'framer-motion';

const CaughtArea = ({ pokemons }) => {
  return (
    <AnimatePresence>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'left',
            marginTop: 8,
            marginLeft: 8
          }}>
          {`Catched Pokemons (${pokemons?.length})`}
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: 18,
            marginLeft: 10
          }}>
          {pokemons?.length !== 0 &&
            pokemons?.map((pokemon) => (
              <motion.div
                key={pokemon?.name}
                style={{
                  cursor: 'pointer',
                  marginRight: 10
                }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1.4 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 2, ease: 'easeInOut' }}>
                <img src={pokemon?.image} alt={pokemon?.name} width="100" />
                <p style={{ textTransform: 'capitalize', marginTop: '-15px' }}>
                  {pokemon?.name?.toLowerCase()}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </AnimatePresence>
  );
};
export default CaughtArea;
