// game variables
let pokemon1 = null;
let pokemon2 = null;
let pokemon3 = null;
let validChoice1 = false;
let validChoice2 = false;
let validChoice3 = false;
let regionType = 'national';

// jQ objects
$card1 = $('#card1')
$card2 = $('#card2')
$card3 = $('#card3')
$selectmenu = $("select-menu")

// fadeIn on load for a nicer effect
$(window).on('load', changeScreen())
$('body').click(()=>location.href="./index.html")

// get the highest allowed number for the pokemon and then get 3 randomly
pokemon1 = getValidPokemonChoice(regionType);
pokemon2 = getValidPokemonChoice(regionType);
pokemon3 = getValidPokemonChoice(regionType);
console.log(pokemon1.name, pokemon2.name, pokemon3.name)

$card1.append(`<p>${pokemon1.name}<p>`, `<img src="${pokemon1.sprites.front_default}"/>`)
$card2.append(`<p>${pokemon2.name}<p>`, `<img src="${pokemon2.sprites.front_default}"/>`)
$card3.append(`<p>${pokemon3.name}<p>`, `<img src="${pokemon3.sprites.front_default}"/>`)

getValidPokemonChoice(regionType);