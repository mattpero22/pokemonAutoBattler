$(window).on('load', fadeScreen())
localStorage.setItem('numFaintedPlayer', 0)
localStorage.setItem('numFaintedOpp', 0)
$('#battle-hdr').text(`Battle # ${parseInt(localStorage.getItem("wins")) + 1}`)     // tell the user what battle it is
battle();
