import { useState, useEffect } from 'react';

const Pokemon = (props) => {
  const { pokeData } = props;
  // TODO: Can also just create 1 pokemon object and put both abilities and moves into it so we only have 1 state.
  const [abilities, setAbilities] = useState([]);
  const [moves, setMoves] = useState([]);

  // API calls for ability data
  const abilityData = async () => {
    const newArr = [];
    for( const ability of pokeData.abilities) {
      const response = await fetch(ability.ability.url);
      const data = await response.json();
      newArr.push({
        name: ability.ability.name,
        effect: data.effect_entries[1].effect
      }); 
    }
    setAbilities(newArr);
  }

  // API calls for move data
  const moveData = async () => {
    const newArr = [];
    for( const move of pokeData.moves) {
      const response = await fetch(move.move.url);
      const data = await response.json();
      newArr.push({
        name: move.move.name,
        accuracy: data.accuracy,
        power: data.power,
        pp: data.pp,
        effect: data.effect_entries[0].effect
      });
    }
    setMoves(newArr);
  }

  // When pokemon is changed, get data and set it to states and map them altogether
  useEffect(() => {
    abilityData();
    moveData();
  }, [pokeData]);

  return (
    <div className='pokemon-container'>
      <h2 className='name'>{pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1)}</h2>
      <div className='sprites'>
        <div className="sprite-default">
          <img src={pokeData.sprites.front_default} />
          <img src={pokeData.sprites.back_default} />
        </div>
        <div className="sprite-shiny">
          <img src={pokeData.sprites.front_shiny} />
          <img src={pokeData.sprites.back_shiny} />
        </div>
      </div>
      <hr className='rounded' />
      <ul className='abilities'>
        {abilities.map(ability => {
          return (
          <li key={ability.name} className='ability'>
            <h3 className='ability-name'>{ability.name.charAt(0).toUpperCase() + ability.name.slice(1)}</h3>
            <p className='ability-eff'>{ability.effect}</p>
          </li>
          );
        })}
      </ul>
      <hr className='rounded' />
      <ul className='moves'>
        {moves.map(move =>  {
          return (
            <li key={move.name} className='move'>
              <h3 className='move-name'>{move.name.charAt(0).toUpperCase() + move.name.slice(1)}</h3>
              <div className="move-detail">
                <div className='move-acc'>Acc: {move.accuracy}</div>
                <div className='move-pow'>Pow: {move.power}</div>
                <div className='move-pp'>PP: {move.pp}</div>
                <p className='move-eff'>{move.effect}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Pokemon;
