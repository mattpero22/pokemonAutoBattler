// game variables
let pokemon1 = null;
let pokemon2 = null;
let pokemon3 = null;
let validChoice1 = false;
let validChoice2 = false;
let validChoice3 = false;
let playerChoice = null;
let regionType = 'national';

// jQ objects
$body = $('body')
$card1 = $('#card1')
$card2 = $('#card2')
$card3 = $('#card3')
$pokeCard = $('.poke-card')
$teamPoke = $('.team-poke')
$selectmenu = $("select-menu")

// fadeIn on load for a nicer effect
$(window).on('load', fadeScreen())
$('#return2menu-btn').click(()=>location.href="./index.html")

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

// $(evt.target).closest('.poke-card') gets the div that was clicked
$pokeCard.click(function (evt) {
    $('.poke-card').css({backgroundColor: '#b5d5efe6'});
    $(evt.target).closest('.poke-card').css({backgroundColor: '#8dd9a1'});
    console.log($(evt.target).closest('.poke-card')[0])
    playerChoice = $(evt.target).closest('.poke-card')[0].querySelector('h3').innerText
    console.log(playerChoice)
});