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
    let validChoice = false;                                                        // hard exit condition to enter while loop
    pokemonRange = getPokedexByRegion(region).pokemon_entries.length;               // gets max number allowed
    while (validChoice === false) {                                                 // enter while loop
        let pokemon = getPokemonByNum(Math.floor(Math.random() * pokemonRange));    // get a pokemon object 
        let pokeSpec = getPokemonSpeciesByURL(pokemon.species.url);                 // get the pokemon species object
        if (pokeSpec.is_legendary === false && pokeSpec.is_mythical === false) {    // check if it is a legendary or mythic
            if(ultraBeasts.includes(pokemon.name) === false){
                validChoice = true
                let pokeEvoChain = getPokemonEvoChainByURL(pokeSpec.evolution_chain.url);   //if it isnt, get the pokemons evolution chain object
                if(pokeEvoChain.chain.species.name == pokemon.name) {       //if the pokemons chain name is the same as its name, it means it is the first in the chain and is a viable pokemon to start
                    return pokemon
                } else {
                    pokemon = getPokemonByName(pokeEvoChain.chain.species.name)
                    return pokemon
                }
            }
        }
    }
}

function getAnyPokemonChoice(region) {
    let pokemonRange = getPokedexByRegion(region).pokemon_entries.length;
    let pokemon = getPokemonByNum(Math.floor(Math.random() * pokemonRange))
    return pokemon
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

function displayPlayerTeam(playerTeam) {
    playerTeam.forEach(function(pabPoke){
        $("#player-team>.inactive:first").append(`<img src="${pabPoke.sprite}"/>`).removeClass('inactive')
        $("#player-team>.inactive:first").addClass('alive')
    })
}

function displayOpponentTeam(opponentTeam) {
    opponentTeam.forEach(function(pabPoke){
        $("#enemy-team>.inactive:first").append(`<img src="${pabPoke.sprite}"/>`).removeClass('inactive').addClass('alive')
        $("#enemy-team>.inactive:first").addClass('alive')
    })
}

function displayPlayerTeamHealth(team) {
    team.forEach(function (poke) {
        $("#player-team-health>.inactive:first").append(`<p>${poke.currentHP} / ${poke.hp}</p>`).removeClass('inactive').addClass('active')
    })
}

function displayOppTeamHealth(team) {
    team.forEach(function (poke) {
        $("#opp-team-health>.inactive:first").append(`<p>${poke.currentHP} / ${poke.hp}</p>`).removeClass('inactive').addClass('active')
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

function generatePlayerTeam() {
    let temp = localStorage.getItem("playerTeam")
    if (temp === '') return
    temp = temp.split(",")
    let i = 1;
    let userTeam = []
    temp.forEach(function(){
        let nextPoke = JSON.parse(localStorage.getItem(`pabPoke${i}`))
        userTeam.push(nextPoke)
        i += 1
    })
    return userTeam
}

function generateOpponentTeam(){
    let opponentTeam = []
    let playerTeam = localStorage.getItem("playerTeam")
    playerTeam = playerTeam.split(',')
    let numPokemon = playerTeam.length
    let wins = parseInt(localStorage.getItem("wins"))
    for (let i=0; i<numPokemon; i++) {
        if (wins < 8) {
            let nextPokemon = new PabPokemon(getValidPokemonChoice('national'));
            opponentTeam.push(nextPokemon)
        } else {
            let nextPokemon = new PabPokemon(getAnyPokemonChoice('national'));
            opponentTeam.push(nextPokemon)
        }
    }
    return opponentTeam
}

function battle() {  // take in the playerTeam as an arg and then take in the oppTeam as an arg
    // vars used in battle
    let battleActive = true;
    let playerTeam = generatePlayerTeam();
    let oppTeam = generateOpponentTeam();
    let playerBattleTeam = playerTeam.sort((a,b) => b.spe - a.spe)  // for each pabPoke in the player's team, sort by fastest -> slowest
    let oppBattleTeam = oppTeam.sort((a, b) => b.spe - a.spe)   // for each pabPoke in the opp's team, sort by fastest -> slowest
    let currentWins = parseInt(localStorage.getItem("wins"))

    // PRE BATTLE
    displayPlayerTeam(playerBattleTeam);
    displayOpponentTeam(oppBattleTeam);
    prepPlayerPokemonTeam(playerBattleTeam, currentWins)     //prep the player's team based on round number and give feedback in combat log
    prepOppPokemonTeam(oppBattleTeam, currentWins)
    displayPlayerTeamHealth(playerBattleTeam)
    displayOppTeamHealth(oppBattleTeam)
    let firstMove = coinFlip();
    let nextMove = null;
    let winner = null;
    let numPlayerAttacks = 0;
    let numOppAttacks = 0;
    let attacker = null;
    let target = null;

    // BATTLE
    while (battleActive) {
        let numFaintedPlayer = parseInt(localStorage.getItem("numFaintedPlayer"))
        let numFaintedOpp = parseInt(localStorage.getItem("numFaintedOpp"))
        console.log('player attacks', numPlayerAttacks)
        console.log('opp attacks', numOppAttacks)
        if (nextMove === null) {
            if (firstMove === 'player'){
                randomTarget = Math.floor(Math.random() * oppBattleTeam.length);
                numFaintedOpp += basicAttack(playerBattleTeam[numPlayerAttacks % playerBattleTeam.length], oppBattleTeam[randomTarget], randomTarget, 'opp');
                numPlayerAttacks = numPlayerAttacks + 1;
                nextMove = 'opp'
            } else if (firstMove === 'opp') {
                randomTarget = Math.floor(Math.random() * playerBattleTeam.length);
                numFaintedPlayer += basicAttack(oppBattleTeam[numOppAttacks % oppBattleTeam.length], playerBattleTeam[randomTarget], randomTarget, 'player');
                numOppAttacks += 1;
                nextMove = 'player'
            }
        } 
        else if (nextMove === 'player') {
            validTarget = false
            validAttacker = false
            while (validTarget === false) {
                randomTarget = Math.floor(Math.random() * oppBattleTeam.length);
                if (oppBattleTeam[randomTarget].fainted === false) {
                    validTarget = true
                    target = randomTarget
                }
            }
            while (validAttacker === false) {
                if(playerBattleTeam[numPlayerAttacks % playerBattleTeam.length].fainted === false) {
                    validAttacker = true
                    attacker = numPlayerAttacks % playerBattleTeam.length
                }
                else {
                    randomAttacker = Math.floor(Math.random() * playerBattleTeam.length)
                    if (playerBattleTeam[randomAttacker].fainted === false) {
                        validAttacker = true
                        attacker = randomAttacker
                    }
                }
            }
            console.log(attacker, target)
            numFaintedOpp += basicAttack(playerBattleTeam[attacker], oppBattleTeam[target], target, 'opp');
            numPlayerAttacks += 1;
            nextMove = 'opp'
        } 
        else if (nextMove === 'opp') {
            validTarget = false;
            validAttacker = false;
            while (validTarget === false) {
                randomTarget = Math.floor(Math.random() * playerBattleTeam.length);
                if (playerBattleTeam[randomTarget].fainted === false) {
                    validTarget = true
                    target = randomTarget
                }
            }
            while (validAttacker === false) {
                if(oppBattleTeam[numOppAttacks % oppBattleTeam.length].fainted === false) {
                    attacker = numOppAttacks % oppBattleTeam.length
                    validAttacker = true
                }
                else {
                    randomAttacker = Math.floor(Math.random() * oppBattleTeam.length)
                    if (oppBattleTeam[randomAttacker].fainted === false) {
                        attacker = randomAttacker
                        validAttacker = true
                    } 
                }
            }
            console.log(attacker, target)
            numFaintedPlayer += basicAttack(oppBattleTeam[attacker], playerBattleTeam[target], target, 'player');
            numOppAttacks += 1;
            nextMove = 'player'
        }
        if (numFaintedPlayer === playerBattleTeam.length) {
            battleActive = false;
            winner = "opponent"
        } else if (numFaintedOpp === oppBattleTeam.length) {
            battleActive = false;
            winner = "player"
        } else {
            localStorage.setItem("numFaintedPlayer", numFaintedPlayer)
            localStorage.setItem("numFaintedOpp", numFaintedOpp)
        }
    }
    localStorage.setItem("numFaintedPlayer", 0)
    localStorage.setItem("numFaintedOpp", 0)
    // POST BATTLE
    if (winner === 'player') {
        $('#combat-log').append('<p>~~~===---~~~YOU WIN~~~---===~~~</p>')
        postPlayerPokemonTeam(playerTeam, currentWins)
        console.log(playerTeam)
        savePlayerTeamToLocal(playerTeam)
        localStorage.setItem("wins", currentWins + 1)
        $('#divider').append('<input id="return" class="battle-btn" type="button" value="BATTLE COMPLETE"/>')
        $('#return').css('background-color', 'yellow').on('click', () => location.href="./selection.html")
    }
    if (winner === 'opponent') {
        $('#combat-log').append('<p>~~~===---~~~YOU LOSE~~~---===~~~</p>')
        $('#combat-log').append(`<p>You won ${currentWins} battles.</p>`)
        localStorage.clear()
        $('#divider').append('<input id="return" class="battle-btn" type="button" value="GAME OVER"/>')
        $('#return').css('background-color', 'red').on('click', () => location.href="./index.html")
    }

}

function prepPlayerPokemonTeam (team, currentWins) {
    team.forEach(function(poke) {
        let additionalStats = currentWins * poke.evolutionsWithPlayer;
        poke.hp += additionalStats
        poke.currentHP += additionalStats
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
        poke.currentHP += additionalStats
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
    let i = 1;
    team.forEach(function(poke) {
        // remove the temporary stat gain from battle
        let additionalStats = currentWins * poke.evolutionsWithPlayer;
        poke.hp -= additionalStats
        poke.currentHP = poke.hp
        poke.atk -= additionalStats
        poke.def -= additionalStats
        poke.spe -= additionalStats
        poke.roundsWithPlayer += 1
        poke.fainted === false
        if (poke.roundsWithPlayer === 5 && poke.evolution !== undefined && poke.evolution !== poke.name) {
            $('#combat-log').append(`${poke.name} is going to evolve into ${poke.evolution}`)
            team[i-1] = new PabPokemon(getPokemonByName(`${poke.evolution}`))
            let newEvolution = getPokemonEvoChainByURL(team[i-1].speciesObj.evolution_chain.url)
            if (newEvolution.chain.evolves_to[0].evolves_to[0]) {
                team[i-1].evolution = newEvolution.chain.evolves_to[0].evolves_to[0].species.name
            }
            team[i-1].evolutionsWithPlayer += 1;
            localStorage.setItem(`pabPoke${i}`, JSON.stringify(poke))
        }
        i += 1;
    })
}

function savePlayerTeamToLocal(playerTeam) {
    let i = 1;
    playerTeam.forEach(function(pokemon) {
        localStorage.setItem(`pabPoke${i}`, JSON.stringify(pokemon))
        i += 1
    })
}

function basicAttack(attacker, defender, defenderIdx, whoWasAttacked) {
    let atk = attacker.atk;
    let def = defender.def;
    let power = 20;
    let dmg = Math.floor((power * (atk/def)));
    $('#combat-log').append(`<p>${attacker.name} attacks ${defender.name} (${dmg}dmg)</p>`)
    defender.currentHP -= dmg
    $(`#${whoWasAttacked}-team-health>.team-poke:nth-of-type(${defenderIdx + 1})>p`).text(`${defender.currentHP}/${defender.hp}`)
    if (defender.currentHP <= 0) {
        $('#combat-log').append(`${defender.name} fainted!`)
        defender.fainted = true

        return 1
    }
    return 0
}