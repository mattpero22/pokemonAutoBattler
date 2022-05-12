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
const typeColor = {
    normal:  "#E2C6A2",
    fire:   "#E16355",
    water:   "#5565E1",
    grass:   "#619C63",
    electric:   "#D9CA5D",
    ice:   "#5DD7D9",
    fighting:   "#914D34",
    poison:   "#945BBA",
    ground:   "#CC8B4E",
    flying:   "#8bdaf7",
    psychic:   "#E68ED1",
    bug:   "#CAE366",
    rock:  "#7d5419",
    ghost:   "#9F74DB",
    dark:   "#6b6770",
    dragon: "#6437DE",
    steel: "#c2c8d1",
    fairy: "#EDB9E4",
}

// ultra beasts data structure
let ultraBeasts =["nihilego","buzzwole","pheromosa","xurkitree","celesteela","kartana","guzzlord","poipole","naganadel","stakataka","blacephalon"]

// Function to change screen
function fadeScreen() {
    $('body').fadeOut(5)
    $('body').fadeIn(1000)
}

// Function to retrieve a pokemon by number and store as a obj
function getPokemonByNum(number) {
    return $.parseJSON($.ajax({ //parse return of ajax.responseText as JSON to get obj back
        url: pokemonURL + number, //pass args for ajax call as an obj to customize it more, this line does url
        async: false,   // makes ajax execute in sync s.t. we have the pokemon we need to move on, before moving on
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
            if(ultraBeasts.includes(pokemon.name) === false){
                validChoice = true
                let pokeEvoChain = getPokemonEvoChainByURL(pokeSpec.evolution_chain.url);//if it isnt, get the pokemons evolution chain object
                if(pokeEvoChain.chain.species.name == pokemon.name) {  //if the pokemons chain name is the same as its name, it means it is the first in the chain and is a viable pokemon to start
                    return pokemon
                } else {
                    pokemon = getPokemonByName(pokeEvoChain.chain.species.name)
                    return pokemon
                }
            }
        }
    }
}

// get a valid choice pokemon for the computer's team
function getComputerPokemon() {
    let playerWins = localStorage.getItem("wins")
    console.log(wins)
}

// generate pokemon selection card contents and event listener
function generatePokeCard(pokemon, div){
    let totalStats = 0;
    $div = $(div);
    $div.append(
        `<h3 class=.poke-name>${pokemon.name}</h2s>`,
        `<img src="${pokemon.sprites.front_default}"/>`,
    );
    pokemon.types.forEach((type) => $div.append($(`<p class=type>${type.type.name}</p>`).css({backgroundColor: typeColor[type.type.name]})));
    if (pokemon.types.length == 1) $div.last().append('<br>');
    pokemon.stats.forEach(function (stat) {
        $div.append(`<p>${stat.base_stat} ${statsAbbr[stat.stat.name]}</p>`) 
        totalStats += stat.base_stat;
    });
    $div.append(`<p>${totalStats} TOTAL</p>`)
}

function displayPlayerTeam() {
    let temp = localStorage.getItem("playerTeam")
    if (temp === '') return
    temp = temp.split(",")
    let i = 0;
    let userTeam = []
    temp.forEach(function(){
        i += 1;
        let nextPoke = JSON.parse(localStorage.getItem(`pabPoke${i}`))
        userTeam.push(nextPoke)
        $("#player-team>.inactive:first").append(`<img src="${nextPoke.sprite}"/>`).removeClass('inactive')
    })
    return userTeam
}

function displayOpponentTeam(opponentTeam) {
    opponentTeam.forEach(function(pabPoke){
        $("#enemy-team>.inactive:first").append(`<img src="${pabPoke.sprite}"/>`).removeClass('inactive')
    })
}

// generate a pokemon team card
function prepareGame() {
    localStorage.clear();
    let PABwins = localStorage.getItem("wins") || 0;
    let PABplayerTeam = localStorage.getItem("playerTeam") || [];
    localStorage.setItem("wins", PABwins)
    localStorage.setItem("playerTeam", PABplayerTeam)
    localStorage.setItem("active", true)
}

function activateBattle() {
    $("#tobattle-btn").css("background-color", "yellow").on("click", function() {
        location.href="./battle.html"
    })
}

function generateOpponentTeam(){
    let opponentTeam = []
    let playerTeam = localStorage.getItem("playerTeam")
    playerTeam = playerTeam.split(',')
    let numPokemon = playerTeam.length

    for (let i=0; i<numPokemon; i++) {
        let nextPokemon = new PabPokemon(getValidPokemonChoice('national'));
        opponentTeam.push(nextPokemon)
    }
    return opponentTeam
}

function battle(playerTeam, oppTeam) {  // take in the playerTeam as an arg and then take in the oppTeam as an arg
    // vars used in battle
    let battleActive = true;
    playerTeam.sort((a,b) => b.spe - a.spe)  // for each pabPoke in the player's team, sort by fastest -> slowest
    oppTeam.sort((a, b) => b.spe - a.spe)   // for each pabPoke in the opp's team, sort by fastest -> slowest
    let currentWins = parseInt(localStorage.getItem("wins"))

    // PRE BATTLE
    prepPlayerPokemonTeam(playerTeam, currentWins)     //prep the player's team based on round number and give feedback in combat log
    prepOppPokemonTeam(oppTeam, currentWins)
    let firstMove = coinFlip();

    // BATTLE
    while (battleActive) {
        performBasicAttack(playerTeam[0], oppTeam[0])

        battleActive = false
    }


    // POST BATTLE
    postPlayerPokemonTeam(playerTeam, currentWins)
    savePlayerTeamToLocal(playerTeam)
    $('#divider').append('<input id="return" class="battle-btn" type="button" value="BATTLE COMPLETE"/>')
    $('#return').css('background-color', 'yellow').on('click', () => location.href="./selection.html")

}

function prepPlayerPokemonTeam (team, currentWins) {
    team.forEach(function(poke) {
        let additionalStats = currentWins * poke.evolutionsWithPlayer;
        poke.hp += additionalStats
        poke.atk += additionalStats
        poke.def += additionalStats
        poke.spe += additionalStats
        $('#combat-log').append(`<p>
        ${poke.name} gained ${additionalStats} in all stats...</p>`)
    })
}


function prepOppPokemonTeam (team, currentWins) {
    let additionalStats = currentWins;
    team.forEach(function(poke) {
        poke.hp += additionalStats
        poke.atk += additionalStats
        poke.def += additionalStats
        poke.spe += additionalStats
    })
    $('#combat-log').append(`<p>Pokemon on the opp. team gained ${additionalStats} in all stats...</p>`)
}

function coinFlip() {
    let coinFlip = Math.floor(Math.random() * 2)
    if (coinFlip) { 
        $('#combat-log').append(`<p>Player goes first</p>`)
        return 'player' 
    } else {
        $('#combat-log').append(`<p>Opponent goes first</p>`)
        return 'opp' 
    }
}

function postPlayerPokemonTeam (team, currentWins){
    team.forEach(function(poke) {
        // remove the temporary stat gain from battle
        let additionalStats = currentWins * poke.evolutionsWithPlayer;
        poke.hp -= additionalStats
        poke.atk -= additionalStats
        poke.def -= additionalStats
        poke.spe -= additionalStats
        poke.roundsWithPlayer += 1
    })
}

function savePlayerTeamToLocal(playerTeam) {
    let i = 1;
    playerTeam.forEach(function(pokemon) {
        localStorage.setItem(`pabPoke${i}`, JSON.stringify(pokemon))
        i += 1
    })
}

function performBasicAttack(attacker, defender) {
    let atk = attacker.atk;
    let def = defender.def;
    let power = 20;
    let dmg = Math.floor((power * (atk/def)));
    $('#combat-log').append(`<p>${attacker.name} attacks ${defender.name} -- ${dmg}dmg</p>`)
}