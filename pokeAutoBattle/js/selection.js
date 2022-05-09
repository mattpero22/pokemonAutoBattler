// import functions from pabFunctions
$.getScript("pabFunctions.js");
// store elements as JQ

// fadeIn on load for a nicer effect
$(window).on('load', function() {
    $('body').fadeOut(0)
    $('body').append('<input type="button" value="Cancel">').click(()=>location.href="./index.html") //cancel button for dev tool
    $('body').fadeIn(2000)
});






