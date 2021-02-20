// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import { useState, useEffect } from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm} from '../pokemon'

function PokemonInfo({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPokemon(pokemonName)
      .then(fetchedPokemon => {
        setPokemon(fetchedPokemon)
        setError(null);
      })
      .catch(error => setError(error));
  }, [pokemonName])

  if (error) {
    return (
      <div role="alert">
        There was an error <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
      </div>
    )
  }

  if (!pokemonName) {
    return "Submit a Pokemon";
  }

  if (pokemonName && !pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  }

  return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
