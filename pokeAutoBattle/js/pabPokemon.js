class PabPokemon {
    constructor (pokemonObj) {
        // data i can get from the api for my game obj
        this.name = pokemonObj.name;
        this.id = pokemonObj.id;
        this.sprite = pokemonObj.sprites.front_default;
        this.type1 = this.getType1(pokemonObj);
        this.type2 = null;
        this.growthRate = null;
        this.speciesURL = null;
        this.evolutionURL =null;
        this.hp = 0;
        this.atk = 0;
        this.def = 0;
        this.spe = 0;
        this.card = null;

        // data and counters I will be using for my game obj
        this.roundsWithPlayer = 0;
        this.timesEvolvedWithPlayer = 0;
        this.move1 = null;
        this.move2 = null;
    }

    getType1(pokemonObj) {
        if (pokemonObj.types[0]) return pokemonObj.types[0].type.name
    }
    getType2(pokemonObj) {
        if (pokemonObj.types[1]) return pokemonObj.types[1].type.name
    }
}