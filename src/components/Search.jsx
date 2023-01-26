import { React, useRef } from 'react';

const Search = (props) => {
  const { setPokeData } = props;
  const searchRef = useRef(null);

  // API call for searched pokemon
  const updateData = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchRef.current.value.toLowerCase()}`);
    const pokeData = await response.json();
    setPokeData(pokeData);
  }

  // Call API on submit and empty out search bar
  const handleOnSubmit = (e) => {
    e.preventDefault();
    updateData();
    searchRef.current.value = '';
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input ref={searchRef} type="text" id="search" placeholder='Enter a pokemon name...'/>
      <button>Search</button>
    </form>
  );
}

export default Search;
