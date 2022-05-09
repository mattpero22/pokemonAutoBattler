// import functions from pabFunctions
$.getScript("pabFunctions.js")
// store elements as JQ

$(window).on('load', function() {
    $('body').fadeOut(0, () => console.log("page loaded"))
    $('body').fadeIn(1000, function() {
    })
})

