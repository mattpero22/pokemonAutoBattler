// Useful constant links to API
const pokedexURL = "https://pokeapi.co/api/v2/pokedex/national";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/1";

// JQ objs
let $body = $('body')
let $pokeName = $('#poke-name')

// function createPokemonCard() {
//     $.ajax(pokemonURL).then(function(data){
//         console.log(data)
//         $body.append(`<p>${data.name}</p>`)
//     })
// }

// createPokemonCard();
// console.log(document.querySelector('p'))
let x = {};

function getPokemon(num) {
    $.extend(
        x,             // var to store retrieved data in
        $.ajax(pokemonURL).then(
            function(data){
                return data
            }
        )
    )
}

getPokemon(1);
console.log(x)
x.then(function(data){
    console.log(data.name)
})
// console.log(typeof(newPokemon))


// x = jQuery.extend(
//     {getValues: function(url) {
//         var result = null;
//         $.ajax({
//             url: pokemonURL,
//             type: 'get',
//             dataType: 'xml',
//             async: false,
//             success: function(data) {
//                 result = data;
//             }
//         });
//        return result;
//     }
// });


