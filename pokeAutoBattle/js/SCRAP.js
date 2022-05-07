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
// let temp = {};
// let pokemon = {
//     name: "",
// };

// function getPokemon(num) {
//     $.extend(
//         temp,             // var to store retrieved data in
//         $.ajax(pokemonURL).then(    // item to store in that variable
//             function(data){
//                 return data
//             }
//         )
//     )
// }

// getPokemon(1);
// console.log(temp)
// temp.then(function(data) {
//     console.log(pokemon)
//     pokemon.name = data.name;
// })
// console.log(pokemon)
// console.log(typeof(newPokemon))


x = jQuery.extend(
    {getValues: function(url) {
        var result = null;
        $.ajax({
            url: pokemonURL,
            type: 'get',
            async: false,
            success: function(data) {
                result = data;
            }
        });
       return result;
    }
});

var result = $.getValues(pokedexURL)
console.log(result.name)