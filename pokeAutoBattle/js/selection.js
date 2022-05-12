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
let numWins = parseInt(localStorage.getItem('wins')) || 0;
let active = localStorage.getItem('active') || true;
let maxTeamSize = localStorage.getItem('maxTeamSize' || false);

// get the highest allowed number for the pokemon and then get 3 randomly that are first evo or only evo
// choices.pokemon1 = getValidPokemonChoice(regionType);
choices.pokemon1 = getValidPokemonChoice(regionType);
choices.pokemon2 = getValidPokemonChoice(regionType);
choices.pokemon3 = getValidPokemonChoice(regionType);

// create the cards the user can interact with
generatePokeCard(choices.pokemon1, '#card1');
generatePokeCard(choices.pokemon2, '#card2');
generatePokeCard(choices.pokemon3, '#card3');

let pabPoke1 = new PabPokemon(choices.pokemon1)
let pabPoke2 = new PabPokemon(choices.pokemon2)
let pabPoke3 = new PabPokemon(choices.pokemon3)
console.log(choices.pokemon1)
console.log(pabPoke1)
console.log(pabPoke2)
console.log(pabPoke3)


displayPlayerTeam();
if (maxTeamSize === 'true') activateBattle();

$pokeCard.on("click", function (evt) {
    $('.poke-card').css({backgroundColor: '#b5d5efe6'});
    $(evt.target).closest('.poke-card').css({backgroundColor: '#8dd9a1'});
    choices.playerChoice = $(evt.target).closest('.poke-card')[0].querySelector('h3').innerText
});

// event listener for the confirm button
$('#confirm-btn').on("click", function() {
    let temp = [] // array to store the new value of playerTeam, 
    let playerTeam = localStorage.getItem('playerTeam') || "noPokemon";
    if (choices.playerChoice === null) return // players choice should be set
    else if (localStorage.getItem("pokeAdded") === 'true') return // player should not have already added a pokemon this turn
    else {
        if (playerTeam === 'noPokemon') temp.push(choices.playerChoice)
        else {
            temp = playerTeam.split(",")
            if (temp.length === 6) {
                localStorage.setItem("maxTeamSize", true)
                activateBattle();
                return
            }
            temp.push(choices.playerChoice)
        }
        localStorage.setItem('playerTeam', temp)
        localStorage.setItem('pokeAdded', true)
        newTeamPoke = getPokemonByName(temp[temp.length - 1])
        $(".inactive:first").append(`<img src="${newTeamPoke.sprites.front_default}"/>`).removeClass('inactive')
        $("#tobattle-btn").css("background-color", "yellow").on("click", function() {
            location.href="./battle.html"
            localStorage.setItem("pokeAdded", false)
        })
    }
})

$('#defer-btn').on("click", function() {
    console.log(localStorage.getItem("playerTeam"))
    if (localStorage.getItem('playerTeam') !== '') activateBattle();
})
