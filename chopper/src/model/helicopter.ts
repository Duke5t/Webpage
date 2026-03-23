import Item from "./item.ts";
import Player from "./player.ts";

export default class Helicopter extends Item {
  static tableName = "helicopter";

  constructor(name: string, ownedBy: Player, count: number = 0, baseCost: number = 1,  
            costMultiplier: number = 1.5, clickPower: number = 1, 
            
    ) {
    super(name, ownedBy, count, 12000, 3, 250);
    this.checkItem();
  }

  protected checkItem() {
    super.checkItem();
  }

  getName(): string {
    return this.name;
  }
}
Item.registerSubclass(Helicopter);