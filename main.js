const fetchPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonsPromises = []

    for (let i = 1; i <= 150; i++) {
        pokemonsPromises.push(fetch(getPokemonUrl(i)).then((response) => response.json()))
    }

    Promise.all(pokemonsPromises)
        .then(pokemons => {
            // Cada pokemon sera uma li
            const liPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                <li class="card ${types[0]}">
                    <img class="cardImage" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
                    <h2 class="cardTitle">${pokemon.id}. ${pokemon.name}</h2>
                    <p class="cardSubTitle">
                        ${types.join(' | ')}
                    </p>
                </li>
                `
                return accumulator;
            }, '')
            
            const ul = document.querySelector("[data-js='pokedex'");

            ul.innerHTML = liPokemons;
        });
}

fetchPokemon()