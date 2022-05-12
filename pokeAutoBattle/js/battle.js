$(window).on('load', fadeScreen())
$('#battle-hdr').text(`Battle # ${parseInt(localStorage.getItem("wins")) + 1}`)     // tell the user what battle it is
displayPlayerTeam();    // display their team
let oppTeam = generateOpponentTeam();   // create an array of PabPokemon for the opponents teakm
displayOpponentTeam(oppTeam);







i = 0
while (i < 10) {
    $('#combat-log').append('<p>battle event</p>')
    i += 1
}
