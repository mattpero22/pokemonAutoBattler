// Useful constant links to API
const pokedexURL = "https://pokeapi.co/api/v2/pokedex/national";
const pokemonURL = "https://pokeapi.co/api/v2/pokemon/1";

// JQ objs
let $body = $('body')
let $pokeName = $('#poke-name')

jQuery.extend(
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