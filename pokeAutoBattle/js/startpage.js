// store elements as JQ
$body = $('body')
$playBtn = $('#play-btn')       // starts game
$rulesBtn = $('#rules-btn')     // displays the rule frame

// if play btn clicked, set it to target firstpick.html
$playBtn.click(function(){
    $body.fadeOut(1000, function() {
        location.href = "./selection.html";
    })
})
        


