import Item from "./item.ts";
import Player from "./player.ts";

export default class Godzilla extends Item {
  static tableName = "godzilla";

  constructor(name: string, ownedBy: Player, count: number = 0, baseCost: number = 1,  
            costMultiplier: number = 1.5, clickPower: number = 1, 
            rate: number = 1
    ) {
    super(name, ownedBy, count, 25000, 2, 500, 2);
    this.checkItem();
  }

  protected checkItem() {
    super.checkItem();
  }

  getName(): string {
    return this.name;
  }
}
Item.registerSubclass(Godzilla);