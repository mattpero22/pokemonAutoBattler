// Useful constant links to API
const pokedexURL = "https://pokeapi.co/api/v2/pokedex/national";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";

// JQ objs
let $body = $('body')

// Function to retrieve a pokemon and store as a local variable
function getPokemonObj(number) {
    return $.parseJSON($.ajax({
        url: pokemonURL + number,
        async: false,
    }).responseText);
}

let result = getPokemonObj(122);
console.log(result.name)
