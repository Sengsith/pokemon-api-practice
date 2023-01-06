import { React, useState } from 'react';

import Search from './components/Search';
import Pokemon from './components/Pokemon';

function App() {
  const [pokeData, setPokeData] = useState(null);

  return (
    <main className="App">
      <h1>Pokemon Search</h1>
      <Search setPokeData={setPokeData} />
      {pokeData ? <Pokemon pokeData={pokeData} /> : ''}
    </main>
  )
}

export default App;
