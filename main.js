const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => Array(150).fill().map((_, index) => fetch(getPokemonUrl(index + 1)).then((response) => response.json()));
    
const generateHTML = pokemons => {
    return pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)
        
        accumulator += `
            <li class="card ${types[0]}">
                <img 
                    class="cardImage" 
                    alt="${pokemon.name}" 
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" 
                />
                <h2 class="cardTitle">
                    ${pokemon.id}. ${pokemon.name}
                </h2>
                <p class="cardSubTitle">
                    ${types.join(' | ')}
                </p>
                </li>`
                return accumulator;
            }, '')
        }

        const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector("[data-js='pokedex'");
    ul.innerHTML = pokemons;
}

const pokemonsPromises = generatePokemonPromises();

Promise.all(pokemonsPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage);  