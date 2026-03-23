import Item from "./item.ts";
import Player from "./player.ts";

export default class Woodpecker extends Item {
  static tableName = "woodpecker";

  constructor(name: string, ownedBy: Player, count: number = 0, baseCost: number = 1,  
            costMultiplier: number = 1.5, clickPower: number = 1, 
            rate: number = 0
    ) {
    super(name, ownedBy, count, 25, 4, 1, 1);  
    this.checkItem();
  }

  protected checkItem() {
    super.checkItem();
  }

  getName(): string {
    return this.name;
  }
}
Item.registerSubclass(Woodpecker);