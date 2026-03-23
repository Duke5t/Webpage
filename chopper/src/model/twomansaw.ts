import Item from "./item.ts";
import Player from "./player.ts";

export default class Twomansaw extends Item {
  static tableName = "twomansaw";

  constructor(name: string, ownedBy: Player, count: number = 0, baseCost: number = 1,  
            costMultiplier: number = 1.5, clickPower: number = 1
    ) {
    super(name, ownedBy, count, 75, 3, 5);
    this.checkItem();
  }

  protected checkItem() {
    super.checkItem();
  }

  getName(): string {
    return this.name;
  }
}
Item.registerSubclass(Twomansaw);