$(window).on('load', fadeScreen())
$('#battle-hdr').text(`Battle # ${parseInt(localStorage.getItem("wins")) + 1}`)     // tell the user what battle it is
let playerTeam = displayPlayerTeam();    // display their team
let oppTeam = generateOpponentTeam();   // create an array of PabPokemon for the opponents teakm
displayOpponentTeam(oppTeam);
battle(playerTeam, oppTeam);
