import Item from "./item.ts";
import Player from "./player.ts";

export default class Ponsse extends Item {
  static tableName = "ponsse";

  constructor(name: string, ownedBy: Player, count: number = 0, baseCost: number = 1,  
            costMultiplier: number = 1.5, clickPower: number = 1
            
    ) {
    super(name, ownedBy, count, 2000, 3, 75);
    this.checkItem();
  }

  protected checkItem() {
    super.checkItem();
  }

  getName(): string {
    return this.name;
  }
}
Item.registerSubclass(Ponsse);