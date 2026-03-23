import Item from "./item.ts";
import Player from "./player.ts";

export default class Chainsaw extends Item {
  static tableName = "chainsaw";

  constructor(name: string, ownedBy: Player, count: number = 0, baseCost: number = 1,  
            costMultiplier: number = 1.5, clickPower: number = 1

    ) {
    super(name, ownedBy, count, 400, 3, 20);
    this.checkItem();
  }

  protected checkItem() {
    super.checkItem();
  }

  getName(): string {
    return this.name;
  }
}
Item.registerSubclass(Chainsaw);