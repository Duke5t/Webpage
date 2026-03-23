import assert from "../assertion.ts";
import db from './connection.ts';
import type Player from './player.ts';


export default class Item {
    protected id?: number;
    protected name: string;
    protected ownedBy: Player;
    protected baseCost: number; //Initial Cost
    protected costMultiplier: number; //actual cost = baseCost + (baseCost * costMultiplier * count)
    protected clickPower: number;
    protected count: number;
    protected rate: number;
    protected itemtype?: string;
    static tableName = "item";
    static #subclasses: Record<string, typeof Item> = {};

    constructor(name: string, ownedBy: Player, count: number = 0, baseCost: number = 1,  
                costMultiplier: number = 1.5, clickPower: number = 1, 
                rate: number = 0
            ) {
                    
        this.name = name;
        this.ownedBy = ownedBy;
        this.baseCost = baseCost; //initial cost
        this.costMultiplier = costMultiplier; //sets intervals for cost
        this.clickPower = clickPower; 
        this.count = count; //number of item upgrades
        this.rate = rate; //autoclicks per second

        this.checkItem();
    }
    
    protected checkItem() {
        assert(this.name.length > 0, "Name must be more than 0 chars.");
        assert(this.name != null, "Name cannot be null");
        assert(this.baseCost >= 0, "Base Cost must not be negative");
        assert(this.costMultiplier > 0, "Multiplier must be strictly positive");
        assert(this.clickPower >= 0, "Click Power must not be negative");   
        assert(this.count >= 0, "Times purchased must not be negative");
    }

    static registerSubclass(subclass: typeof Item) {
        Item.#subclasses[subclass.tableName] = subclass;
    }
    buy(): void {
        this.count++;
    }
    
    getCount(): number {
        return this.count;
    }
    
    getClickPower() : number {
        return this.clickPower*(this.count);
        // return this.clickPower*(this.count+1);
    }
    
    getCost(): number {
        //offset for first purchase (baseCost + (0))
        return this.baseCost * (this.costMultiplier ** this.count); 
    }
    
    getName(): string {
        return this.name;
    }
    
    getRate(): number {
        return this.rate;
    }


    static async getItemsForPlayer(player: Player) : Promise<Array<Item>> {
            
        let results = await db().query<
        {
            id: number,
            itemtype: string,
            name: string,
            ownedby: string,
            count: number,
            basecost: number,
            costmultiplier: number,
            clickpower: number,
            rate: number
        }
        >(`select id, itemtype, name, ownedBy, count, basecost, costmultiplier, clickpower, rate from item where ownedby = $1`,
            [player.getName()]);
   
        let allItems = new Array<Item>();
            
        for(let row of results.rows) {
            let item = new Item(row.name, player, row.count, row.basecost, row.costmultiplier, row.clickpower, row.rate);
            item.id = row.id;
            allItems.push(item);
        }

        return allItems;
    }

    static async saveItem(item: Item, player: Player): Promise<void> {
        const type = item.getName().toLowerCase();

        const exists = await db().query<{id: number}>(
            `select id from item where itemType = $1 and ownedBy = $2`,
            [type, player.getName()]
        );


        if (exists.rows.length > 0) {

            await db().query(
                `update item set count = $1 where id = $2`,
                [item.getCount(), exists.rows[0].id]
            );
        } else {
            await db().query(
                `insert into item(id, itemType, name, ownedBy, count, baseCost, costMultiplier, clickPower, rate)
                values(default, $1, $2, $3, $4, $5, $6, $7, $8)`,
                [type, item.getName(), player.getName(), item.getCount(),
                item.baseCost, item.costMultiplier, item.clickPower, item.getRate()]
            );
        }
    }
}
