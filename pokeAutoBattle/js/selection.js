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
$(window).on('load', loadScreen())
$('body').click(()=>location.href="./index.html")

// get the highest allowed number for the pokemon and then get 3 randomly
pokemon1 = getValidPokemonChoice(regionType);
pokemon2 = getValidPokemonChoice(regionType);
pokemon3 = getValidPokemonChoice(regionType);
//console.log(pokemon1.name, pokemon2.name, pokemon3.name)
console.log(pokemon1)
// console.log(pokemon2)
// console.log(pokemon3)

generatePokeCard(pokemon1, '#card1');
generatePokeCard(pokemon2, '#card2');
generatePokeCard(pokemon3, '#card3');
