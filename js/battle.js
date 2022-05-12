$(window).on('load', fadeScreen())
$('#battle-hdr').text(`Battle # ${parseInt(localStorage.getItem("wins")) + 1}`)     // tell the user what battle it is
battle();

for (let i = 0; i <20; i++){
    $('#combat-log').append('<p>NEW MESSAGE</p>')
}