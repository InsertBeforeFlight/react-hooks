// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import { useState, useEffect } from 'react'

const STORAGE_NAME_KEY = "name";

const getValueInLocalStorage = (key, initialValue, deserializer) => {
  const valueInLocalStorage = window.localStorage.getItem(key);
  return valueInLocalStorage ? deserializer(valueInLocalStorage) : initialValue;
}

const setValueInLocalStorage = (key, value, serializer) => {
  window.localStorage.setItem(key, serializer(value))
}

function useLocalStorageState(key, initialValue, serialize = JSON.stringify, deserialize = JSON.parse ) {
  const [state, setState] = useState(() => getValueInLocalStorage(STORAGE_NAME_KEY, initialValue, deserialize))

  useEffect(() => {
    setValueInLocalStorage(key, state, serialize);
  }, [key, state])

  return [state, setState]
}

function Greeting({initialGreeting = {}}) {
  const [greeting, setGreeting] = useLocalStorageState(STORAGE_NAME_KEY, initialGreeting);

  function handleChange(event) {
    setGreeting({ name: event.target.value });
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={greeting.name} onChange={handleChange} id="name" />
      </form>
      {greeting.name ? <strong>Hello {greeting.name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
