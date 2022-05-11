// store elements as JQ
$body = $('body')
$playBtn = $('#play-btn')       // starts game
$rulesBtn = $('#rules-btn')     // displays the rule frame
$themeBtn = $('#theme-btn')     // toggles day and night theme

// fade in on load
$(window).on('load', fadeScreen())

// if play btn clicked, set it to target firstpick.html
$playBtn.click(function(){
    let PABwins = localStorage.getItem("wins") || 0;
    localStorage.setItem("wins", PABwins)
    let PABplayerTeam = localStorage.getItem("playerTeam") || [];
    localStorage.setItem("playerTeam", PABplayerTeam)
    $body.fadeOut(1000, function() {
        location.href = "./selection.html";
    })
})

$themeBtn.click(function(){
    $body.fadeOut(1000, function(){
        $body.css("background-image", "url(./css/images/night.jpg)")
        $body.fadeIn(1000)
    })
})


