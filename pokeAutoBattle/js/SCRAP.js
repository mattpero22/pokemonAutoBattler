// Useful constant links to API
const pokedexURL = "https://pokeapi.co/api/v2/pokedex/national";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";

// JQ objs
let $body = $('body')

// Function to retrieve a pokemon and store as a local variable
function getPokemonByNum(number) {
    return $.parseJSON($.ajax({
        url: pokemonURL + number,
        async: false,
    }).responseText);
}

function getPokemonByName(name) {
    return $.parseJSON($.ajax({
        url: pokemonURL + name,
        async: false,
    }).responseText);
}

let sableye = getPokemonByNum(1);
console.log(sableye)
console.log(sableye.sprites.front_default)
$body.append(`<p>${sableye.name}</p>`)
$body.append(`<img src='${sableye.sprites.front_default}'/>`)

let eevee = getPokemonByName('eevee');
$body.append(`<p>${eevee.name}</p>`)
$body.append(`<img src='${eevee.sprites.front_default}'/>`)

