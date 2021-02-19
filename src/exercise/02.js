// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import { useState, useEffect } from 'react'

const STORAGE_NAME_KEY = "name";

const getNameFromLocalStorage = initialName => window.localStorage.getItem(STORAGE_NAME_KEY) || initialName;

function Greeting({initialName = ''}) {
  const [name, setName] = useState(() => getNameFromLocalStorage(initialName))

  useEffect(() => {
    window.localStorage.setItem(STORAGE_NAME_KEY, name);
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
