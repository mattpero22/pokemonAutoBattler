$(window).on('load', fadeScreen())
$('#battle-hdr').text(`Battle # ${parseInt(localStorage.getItem("wins")) + 1}`)
displayPlayerTeam();
generateOpponentTeam();





i = 0
while (i < 10) {
    $('#combat-log').append('<p>battle event</p>')
    i += 1
}
