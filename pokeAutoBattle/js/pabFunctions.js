// Useful constant links to API
const pokedexURL = "https://pokeapi.co/api/v2/pokedex/";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
const evolutionURL = "https://pokeapi.co/api/v2/evolution-chain/";
const growthURL = "https://pokeapi.co/api/v2/growth-rate/";

// shorthand stats data object
const statsAbbr = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SPA",
    "special-defense": "SPD",
    speed: "SPE"
}

// typing color data object
const typeColor = {}

// Function to change screen
function fadeScreen() {
    $('body').fadeOut(0)
    $('body').fadeIn(1000)
}

function loadScreen() {
    
}

// Function to retrieve a pokemon by number and store as a obj
function getPokemonByNum(number) {
    return $.parseJSON($.ajax({ //parse return of ajax.responseText as JSON to get obj back
        url: pokemonURL + number, //pass args for ajax call as an obj to customize it more, this line does url
        async: false,   // makes ajax execute in sync s.t. we have the pokemon we need to move on
    }).responseText);
}

function getPokemonSpeciesByURL(speciesURL) {
    return $.parseJSON($.ajax({
        url: speciesURL,
        async: false,
    }).responseText);
}

// Function to retrieve a pokemon by name and store as a obj
function getPokemonByName(name) {
    return $.parseJSON($.ajax({
        url: pokemonURL + name,
        async: false,
    }).responseText);
}

// Function to retrieve the # of entries when passed the type of pokedex
function getPokedexByRegion(region) {
    return $.parseJSON($.ajax({
        url: pokedexURL+region,
        async: false,
    }).responseText)
}

// Function to identify the evolutionary stage of a pokemon when passed it's id
function getPokemonEvoChainByURL(evoChainURL) {
    return $.parseJSON($.ajax({
        url: evoChainURL,
        async: false,
    }).responseText);
}

// Get valid choice pokemon
function getValidPokemonChoice(region) {
    let validChoice = false;                                                    // hard exit condition to enter while loop
    pokemonRange = getPokedexByRegion(region).pokemon_entries.length;           // gets max number allowed
    while (validChoice === false) {                                             // enter while loop
        let pokemon = getPokemonByNum(Math.floor(Math.random() * pokemonRange));// get a pokemon object 
        let pokeSpec = getPokemonSpeciesByURL(pokemon.species.url);             // get the pokemon species object
        if (pokeSpec.is_legendary === false && pokeSpec.is_mythical === false) {// check if it is a legendary or mythic
            let pokeEvoChain = getPokemonEvoChainByURL(pokeSpec.evolution_chain.url);//if it isnt, get the pokemons evolution chain object
            if(pokeEvoChain.chain.species.name === pokemon.name) {  //if the pokemons chain name is the same as its name, it means it is the first in the chain and is a viable pokemon to start
                validChoice = true;
                return pokemon
            } 
        }
    }
}

// generate pokemon selection card
function generatePokeCard(pokemon, div){
    $div = $(div);
    $div.append(
        `<h2>${pokemon.name}</h2s>`,
        `<img src="${pokemon.sprites.front_default}"/>`,
    );
    pokemon.types.forEach((type) => $div.append(`<p class="type">${type.type.name}</p>`));
    
    pokemon.stats.forEach((stat) => console.log(stat.base_stat));
    pokemon.stats.forEach((stat) => $div.append(`<p>${stat.base_stat} ${statsAbbr[stat.stat.name]}</p>`));
}