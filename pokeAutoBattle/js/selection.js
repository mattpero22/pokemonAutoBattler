// game variables
choices = {
    pokemon1: null,
    pokemon2: null,
    pokemon3: null,
    playerChoice: null,
}
let validChoice1 = false;
let validChoice2 = false;
let validChoice3 = false;
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
let playerTeam = localStorage.getItem('playerTeam') || []
let numWins = parseInt(localStorage.getItem('wins')) || 0;
let active = localStorage.getItem('active') || true;
let pokeAdded = localStorage.getItem('pokeAdded') || false;

// get the highest allowed number for the pokemon and then get 3 randomly that are first evo or only evo
choices.pokemon1 = getValidPokemonChoice(regionType);
choices.pokemon2 = getValidPokemonChoice(regionType);
choices.pokemon3 = getValidPokemonChoice(regionType);

// create the cards the user can interact with
generatePokeCard(choices.pokemon1, '#card1');
generatePokeCard(choices.pokemon2, '#card2');
generatePokeCard(choices.pokemon3, '#card3');

$pokeCard.on("click", function (evt) {
    $('.poke-card').css({backgroundColor: '#b5d5efe6'});
    $(evt.target).closest('.poke-card').css({backgroundColor: '#8dd9a1'});
    choices.playerChoice = getPokemonByName($(evt.target).closest('.poke-card')[0].querySelector('h3').innerText)
});

// event listener for the confirm button
$('#confirm-btn').on("click", function() {
    let temp = []
    console.log(choices.playerChoice)
    if (choices.playerChoice === null) console.log("player choice is null", playerChoice)
    else if (localStorage.getItem("pokeAdded") === 'true') console.log("a pokemon was already confirmed this turn")
    else if (playerTeam){
        console.log(playerTeam)
        temp = playerTeam.split(",")
        if (temp.length === 6) console.log("team is at max length", playerTeam)
        else {
            newTeamPokemon = new PabPokemon(choices.playerChoice)
            console.log(newTeamPokemon)
            if (playerTeam.length === 0) temp.push(choices.playerChoice.name)
            else {
                temp = playerTeam.split(',')
                temp.push(playerChoice)
            }
            localStorage.setItem("playerTeam", temp);
            localStorage.setItem("pokeAdded", true);
            $('#confirm-btn').off("click");

            // add pokemon imgcard to team
            generatePokeTeamCard()
            // add battle button to selection page which will take you to the battle page
        }
    }
})
