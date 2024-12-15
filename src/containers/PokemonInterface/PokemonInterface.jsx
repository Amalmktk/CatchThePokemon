import { useEffect, useState } from 'react';
import GameArea from '../../components/GameArea/GameArea';
import CaughtArea from '../../components/CaughtArea';

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const dialogStyle = {
  position: 'relative',
  background: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  textAlign: 'center',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  border: 'none',
  background: 'transparent',
  fontSize: '18px',
  cursor: 'pointer'
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const PokemonInterface = () => {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [pokemonPosition, setPokemonPosition] = useState({
    top: '50%',
    left: '50%'
  });
  const [catchedPokemons, setCatchedPokemons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    handleFetchPokemon();
  }, []);

  const handleFetchPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentPokemon({
          name: data?.name,
          image: data?.sprites.front_default
        });
        setPokemonPosition({
          top: `${Math.random() * 70 + 10}%`,
          left: `${Math.random() * 70 + 10}%`
        });
      });
  };

  const handleCatchPokemon = (pokemon) => {
    handleFetchPokemon();
    setCurrentPokemon(null);
    const newSet = [...catchedPokemons, pokemon];
    setCatchedPokemons([...newSet]);
    if (newSet?.length === 5) {
      setIsModalOpen(true);
    }
  };

  const handleRestart = () => {
    setIsModalOpen(false);
    setCurrentPokemon(null);
    handleFetchPokemon();
    setCatchedPokemons([]);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          height: 80,
          backgroundColor: '#2978f3',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
        <div
          style={{
            fontSize: 30,
            color: 'white',
            textAlign: 'left',
            fontWeight: 'bold',
            marginTop: 15,
            marginLeft: 20
          }}>
          Catch The Pokemon
        </div>
        <button
          onClick={handleRestart}
          style={{
            backgroundColor: 'white',
            height: 35,
            width: 90,
            borderRadius: 5,
            marginTop: 18,
            marginRight: 5,
            cursor: 'pointer'
          }}>
          Restart
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div
          style={{
            height: '80%',
            borderBottom: '1px solid black',
            position: 'relative'
          }}>
          <GameArea
            pokemon={currentPokemon}
            handleCatch={handleCatchPokemon}
            position={pokemonPosition}
          />
        </div>
        <div style={{ height: '30%' }}>
          <CaughtArea pokemons={catchedPokemons} />
        </div>
      </div>
      {isModalOpen && (
        <div style={overlayStyle}>
          <div style={dialogStyle}>
            <button style={closeButtonStyle} onClick={handleClose}>
              &times;
            </button>
            <h2>You WON!</h2>
            <button style={buttonStyle} onClick={handleRestart}>
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonInterface;
