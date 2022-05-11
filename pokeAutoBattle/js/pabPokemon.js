class PabPokemon {
    constructor (name, id, sprite, type1, type2, growthRate, speciesURL) {
        // data i can get from the api for my game obj
        this.name = null;
        this.id = null;
        this.sprite = null;
        this.type1 = null;
        this.type2 = null;
        this.growthRate = null;
        this.speciesURL = null;
        this.evolutionURL =null;
        this.hp = 0;
        this.atk = 0;
        this.def = 0;
        this.spe = 0;

        // data and counters I will be using for my game obj
        this.roundsWithPlayer = 0;
        this.timesEvolvedWithPlayer = 0;
        this.move1 = null;
        this.move2 = null;
    }
}