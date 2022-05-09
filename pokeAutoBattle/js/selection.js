// import functions from pabFunctions
$.getScript("pabFunctions.js")
// store elements as JQ

$(window).on('load', function() {
    $('body').fadeOut(0)
    $('body').append('<input type="button" value="Cancel">').click(()=>location.href="./index.html")
    $('body').fadeIn(1000, function() {

    })
})

