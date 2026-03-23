import Item from "./item.ts";
import Player from "./player.ts";

export default class Lumberjack extends Item {
  static tableName = "lumberjack";

  constructor(name: string, ownedBy: Player, count: number = 0, baseCost: number = 1,  
            costMultiplier: number = 1.5, clickPower: number = 1, 
            rate: number = 1
    ) {
    super(name, ownedBy, count, 150, 3, 5, 1);
    this.checkItem();
  }

  protected checkItem() {
    super.checkItem();
  }

  getName(): string {
    return this.name;
  }
}
Item.registerSubclass(Lumberjack);