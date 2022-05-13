
# Pokemon Auto Battler
### by Matthew Pero
## A randomized, roguelike, pokemon experience built with:
- HTML
- CSS
- JavaScript
- JQuery
- PokeAPI (https://pokeapi.co/)

#### Play here https://mattpero22.github.io/pokemonAutoBattler/
Pokemon Auto Battler is a unique game that uses pokemon as the characters in a roguelike adventure. Start by selecting your first pokemon of three randomly generated ones. Following, you're pitted against the computer in a game of... well... randomness. You don't need to do anything except choose your pokemon wisely and hope for the best!

## Rules
1. Upon starting the game, select the play button. If there is a local save, you will be prompted to continue or to begin anew.
![titleScreen](https://i.imgur.com/WP1B1y5.png)
2. Three random pokemon will be generated for you to select from.
   ![pokeSelection](https://i.imgur.com/gf5s6qw.png)
3. Your first turn, you must select a pokemon, however, any turn after, you can choose to defer your choice.
4. After making a selection, your pokemon will appear in your team and the battle button will be activated
   ![firstPokeSelected](https://i.imgur.com/ribQZ4D.png)
5. Going into battle, your team will be aligned on the left, while the computer's team is generated on the right. The computer will always have the same number of pokemon as the player. Your pokemon will gain stats equal to the number of battles you have won.
6. The computer''s pokemon will be low level for the first 8 rounds, and then afterwards, any pokemon can be selected to battle against you.
7. The battle is auto generated, with the events being logged into the combat log on the left side. The first team to fight is determined by a coin flip, and then it alternated from there on out.
8. If you win the battle, you will be prompted to return to the selection screen and add another pokemon to your team.
   ![battleWon](https://i.imgur.com/sUUqcuk.png)
9. However, if you lose the battle, it is GAME OVER!
    ![battleLost](https://i.imgur.com/0SDsUix.png)
10. See how many wins you can get with your favorite pokemon!

### Other game features
- a pokemon's health is equal to its base health multiplied by 2
- a pokemon's attack for damage calculation is its ATK + SPA
- a pokemon's defense for damage calculation is its DEF + SPD
- a pokemon that has successfully completed 5 battles with you will evolve!
- a pokemon that has evolved while part of your team will get twice as many bonus stats
- local storage saves your game so you can close it and come back later! (Game is deleted when you see game over though!)

### Future work
- add animations for the battle scene
- add pokemon typing (super-effective/not-very-effective)
- add a special attack for each pokemon rather than the only basicAttack as of now
- add a details screen for your team's pokemon
- add a night/dark theme

