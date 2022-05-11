// store elements as JQ
$body = $('body')
$playBtn = $('#play-btn')       // starts game
$rulesBtn = $('#rules-btn')     // displays the rule frame
$themeBtn = $('#theme-btn')     // toggles day and night theme

// fade in on load
$(window).on('load', fadeScreen())

// if play btn clicked, set it to target firstpick.html
$playBtn.on('click', function(){
    $playBtn.off("click")
    let PABactive = localStorage.getItem("active");
    if (PABactive) {
        $('#startmenu-btns')
            .append('<p>Previous game detected. Would you like to continue?</p>')
            .append('<input id="continue" type="button" class="startmenu-btn" value="CONTINUE"/>')
            .append('<input id="reset" type="button" class="startmenu-btn" value="NEW GAME"/>')
    } else {
        prepareGame();
        $body.fadeOut(1000, function() {location.href = "./selection.html"; }) 
    }
    $('#continue').on("click", function(){
        $('#startmenu-btns').append('<p>Continuing...<p>')
        $body.fadeOut(1000, function() {location.href = "./selection.html";})
    })
    $('#reset').on("click", function(){
        prepareGame();
        $body.fadeOut(1000, function() {location.href = "./selection.html";})
    })
})

$themeBtn.click(function(){
    $body.fadeOut(1000, function(){
        $body.css("background-image", "url(./css/images/night.jpg)")
        $body.fadeIn(1000)
    })
})


