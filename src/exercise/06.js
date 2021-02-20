// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import { useState, useEffect } from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm} from '../pokemon'

const STATUS_IDLE = "idle";
const STATUS_PENDING = "pending";
const STATUS_RESOLVED = "resolved";
const STATUS_REJECTED = "rejected";

const initialState = { status: STATUS_IDLE, pokemon: null, error: null };

function PokemonInfo({ pokemonName }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(currentState => ({
      ...currentState,
      status: STATUS_PENDING
    }))
    fetchPokemon(pokemonName)
      .then(fetchedPokemon => {
        setState({
          status: STATUS_RESOLVED,
          pokemon: fetchedPokemon,
          error: null
        })
      })
      .catch(error => {
        setState({
          status: STATUS_REJECTED,
          pokemon: null,
          error: error.message
        })
      });
  }, [pokemonName])

  if (state.error) {
    return (
      <div role="alert">
        There was an error <pre style={{ whiteSpace: "normal" }}>{state.error}</pre>
      </div>
    )
  }

  if (!pokemonName) {
    return "Submit a Pokemon";
  }

  if (pokemonName && !state.pokemon) {
    return <PokemonInfoFallback name={pokemonName} />;
  }

  return <PokemonDataView pokemon={state.pokemon} />
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
