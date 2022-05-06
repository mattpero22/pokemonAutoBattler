URL = "https://pokeapi.co/api/v2/pokemon/bulbasaur"

$.ajax(URL).then(function(data){
    console.log(data),
    function() {console.log("error")}
})