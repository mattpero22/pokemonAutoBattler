$(window).on('load', fadeScreen())
$('#battle-hdr').text(`Battle # ${parseInt(localStorage.getItem("wins")) + 1}`)     // tell the user what battle it is
let playerTeam = displayPlayerTeam();    // display their team
displayPlayerTeamHealth(playerTeam)
let oppTeam = generateOpponentTeam();   // create an array of PabPokemon for the opponents teakm
displayOpponentTeam(oppTeam);
displayOppTeamHealth(oppTeam);

battle(playerTeam, oppTeam);

for (let i = 0; i <20; i++){
    $('#combat-log').append('<p>NEW MESSAGE</p>')
}