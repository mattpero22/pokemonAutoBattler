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

// get and set local storage
let playerTeam = localStorage.getItem('playerTeam') || [];
let numWins = parseInt(localStorage.getItem('wins')) || 0;
let active = localStorage.getItem('active') || true;
let pokeAdded = localStorage.getItem('pokeAdd') || false;

// eevee = getPokemonByName('eevee'),
// eeveeSpec = getPokemonSpeciesByURL(eevee.species.url)
// console.log(getPokemonEvoChainByURL(eeveeSpec.evolution_chain.url))
// get the highest allowed number for the pokemon and then get 3 randomly
pokemon1 = getValidPokemonChoice(regionType);
pokemon2 = getValidPokemonChoice(regionType);
pokemon3 = getValidPokemonChoice(regionType);
//console.log(pokemon1.name, pokemon2.name, pokemon3.name)
// console.log(pokemon1)
// console.log(pokemon2)
// console.log(pokemon3)

generatePokeCard(pokemon1, '#card1');
generatePokeCard(pokemon2, '#card2');
generatePokeCard(pokemon3, '#card3');

// $(evt.target).closest('.poke-card') gets the div that was clicked
$pokeCard.click(function (evt) {
    if (pokeAdded === true) $pokeCard.off("click")
    $('.poke-card').css({backgroundColor: '#b5d5efe6'});
    $(evt.target).closest('.poke-card').css({backgroundColor: '#8dd9a1'});
    playerChoice = $(evt.target).closest('.poke-card')[0].querySelector('h3').innerText
});

$('#confirm-btn').click(function() {
    let temp = []
    if (playerChoice === null) return
    else if (playerTeam.length === 6) return
    else if (pokeAdded === true) return
    else {
        if (playerTeam.length === 0) temp.push(playerChoice)
        else {
            temp = playerTeam.split()
            console.log(temp)
            temp.push(playerChoice)
        }
        localStorage.setItem("playerTeam", temp)
        localStorage.setItem("pokeAdded", true);
    }
})
