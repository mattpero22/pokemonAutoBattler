// Useful constant links to API
const pokedexURL = "https://pokeapi.co/api/v2/pokedex/national";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/";

// Function to retrieve a pokemon by number and store as a obj
function getPokemonByNum(number) {
    return $.parseJSON($.ajax({ //parse return of ajax.responseText as JSON to get obj back
        url: pokemonURL + number, //pass args for ajax call as an obj to customize it more, this line does url
        async: false,   // makes ajax execute in sync s.t. we have the pokemon we need to move on
    }).responseText);
}

// Function to retrieve a pokemon by name and store as a obj
function getPokemonByName(name) {
    return $.parseJSON($.ajax({
        url: pokemonURL + name,
        async: false,
    }).responseText);
}

// Function to change screen
function changeScreen() {
    $('body').fadeOut(0)
    $('body').append('<input type="button" value="Cancel">').click(()=>location.href="./index.html")
    $('body').fadeIn(2000)
}
