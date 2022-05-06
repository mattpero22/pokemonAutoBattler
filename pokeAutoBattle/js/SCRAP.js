URL = "https://pokeapi.co/api/v2/"
$.ajax(URL).then(function(data){
    console.log(data),
    function() {console.log("error")}
})