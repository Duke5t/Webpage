import Player from "../model/player.ts";
import assert from "../assertion.ts";

export default class Clicker {
    
    #valuePerClick: number = 1;
    #player: Player;

    constructor(player: Player) {
        this.#player = player;

        this.#checkClicker();
    }

    click() {
        this.#updateValuePerClick();
        this.#player.incrementCurrency(this.#valuePerClick);

        this.#checkClicker();
    }

    #updateValuePerClick() {
        let val = 1; 
        for (const i of this.#player.getItems()) {
            //If not autoclicker
            if (i.getRate()==0) {
                val += i.getClickPower();
            }    
        }
        this.#valuePerClick = val;

        this.#checkClicker();
    }


    #checkClicker() {
        assert(this.#valuePerClick > 0, "Click Power must not be negative");
        // assert(this.#player != null, "Player must not be null");
    }
}