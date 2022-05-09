// Useful constant links to API
const pokedexURL = "https://pokeapi.co/api/v2/pokedex/";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";
const evolutionURL = "https://pokeapi.co/api/v2/evolution-chain/";

// Function to change screen
function changeScreen() {
    $('body').fadeOut(0)
    $('body').fadeIn(1000)
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
    let validChoice = false;
    pokemonRange = getPokedexByRegion(region).pokemon_entries.length;
    while (validChoice === false) {
        let pokemon = getPokemonByNum(Math.floor(Math.random() * pokemonRange));
        let pokeSpec = getPokemonSpeciesByURL(pokemon.species.url);
        if (pokeSpec.is_legendary === false && pokeSpec.is_mythical === false) {
            let pokeEvoChain = getPokemonEvoChainByURL(pokeSpec.evolution_chain.url);
            if(pokeEvoChain.chain.species.name === pokemon.name) {
                validChoice = true;
                return pokemon
            } 
        }
    }
}
