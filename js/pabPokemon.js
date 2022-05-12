class PabPokemon {
    constructor (pokemonObj) {
        // data i can get from the api for my game obj
        this.name = pokemonObj.name;
        this.id = pokemonObj.id;
        this.sprite = pokemonObj.sprites.front_default;
        this.type1 = this.getType1(pokemonObj);
        this.type2 = this.getType2(pokemonObj);
        //this.growthRate = null;
        this.speciesURL = pokemonObj.species.url;
        this.speciesObj = getPokemonSpeciesByURL(this.speciesURL);
        this.evolution = this.getNextEvolution(this.speciesObj, this.name);
        this.hp = pokemonObj.stats[0].base_stat * 2;
        this.atk = pokemonObj.stats[1].base_stat + pokemonObj.stats[3].base_stat;
        this.def = pokemonObj.stats[2].base_stat + pokemonObj.stats[4].base_stat;
        this.spe = pokemonObj.stats[5].base_stat;

        // data and counters I will be using for my game obj
        this.roundsWithPlayer = 0;
        this.evolutionsWithPlayer = 1;
        this.move1 = null;
        this.move2 = null;
        this.currentHP = this.hp;
        this.fainter = false;
    }

    getType1(pokemonObj) {
        if (pokemonObj.types[0]) {
            return pokemonObj.types[0].type.name
        } 
    }
    getType2(pokemonObj) {
        if (pokemonObj.types[1]) {
            return pokemonObj.types[1].type.name
        } 
    }

    getNextEvolution(pokeSpeciesURL, pokeName) {
        let pokeEvoChain = getPokemonEvoChainByURL(pokeSpeciesURL.evolution_chain.url)
        if (pokeName === 'eevee'){
            let randomNumber = Math.floor(Math.random() * 8)
            return pokeEvoChain.chain.evolves_to[randomNumber].species.name
        } 
        if (pokeEvoChain.chain.evolves_to[0]) return pokeEvoChain.chain.evolves_to[0].species.name
    }
}