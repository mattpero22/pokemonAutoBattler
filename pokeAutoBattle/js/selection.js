// jQ objects
$card1 = $('#card1')
$card2 = $('#card2')
$card3 = $('#card3')

// fadeIn on load for a nicer effect
$(window).on('load', changeScreen())
$('body').click(()=>location.href="./index.html")

// get the highest allowed number for the pokemon and them get 3 randomly
pokemonRange = getPokedexByRegion('national').pokemon_entries.length;
pokemon1 = getPokemonByNum(Math.floor(Math.random() * pokemonRange))
pokemon2 = getPokemonByNum(Math.floor(Math.random() * pokemonRange))
pokemon3 = getPokemonByNum(Math.floor(Math.random() * pokemonRange))
console.log(pokemon1, pokemon2, pokemon3)

$card1.append(`<p>${pokemon1.name}<p>`, `<img src="${pokemon1.sprites.front_default}"/>`)
$card2.append(`<p>${pokemon2.name}<p>`, `<img src="${pokemon2.sprites.front_default}"/>`)
$card3.append(`<p>${pokemon3.name}<p>`, `<img src="${pokemon3.sprites.front_default}"/>`)
