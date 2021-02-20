// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import { useState, useEffect, Component } from 'react'
import {fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm, PokemonErrorBoundary} from '../pokemon'

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
        })
      })
      .catch(error => {
        setState({
          status: STATUS_REJECTED,
          pokemon: null,
          error
        })
      });
  }, [pokemonName])

  if (!pokemonName) {
    return "Submit a Pokemon";
  }

  if (state.status === STATUS_PENDING) {
    return "Loading..."
  }

  if (state.status === STATUS_REJECTED) {
    throw state.error;
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
        <PokemonErrorBoundary key={pokemonName}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
