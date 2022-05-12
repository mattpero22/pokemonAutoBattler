$(window).on('load', fadeScreen())
displayPlayerTeam();

i = 0
while (i < 10) {
    $('#combat-log').append('<p>battle event</p>')
    i += 1
}
