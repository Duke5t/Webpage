//use 'type' for interface import
import type Listener from "./listener.ts";
import assert from "../assertion.ts";
import Item from "./item.ts";
import Axe from "./axe.ts";
import db from './connection.ts';


export default class Player {
  #listeners: Array<Listener> = [];
  #id?: number;
  #money = 0;
  readonly name: string;
  readonly password: string;
  #totalClicks = 0;
  #items: Array<Item>;


  constructor(name: string, hashedPassword: string, items?: Array<Item>){
    this.name = name;
    this.password = hashedPassword;
    
    this.#items = items ?? new Array<Item>;

    if (this.name.length == 0) {
      throw new InvalidPlayerNameException();
    }
    if (this.password.length < 8) {
      throw new InvalidPasswordException();
    }

    this.#checkPlayer();
  }
  
  static async getAllPlayers() : Promise<Array<Player>> {
    const allPlayers = new Array<Player>();

    //Query database for this query and its stored as {name:string}
    let results = await db().query<{id: number, name: string, password: string, money: number}>("select id, name, password, money from player");

    for(let row of results.rows) {
      let player = new Player(row.name, row.password);
      player.#money = row.money;
      player.#items = await Item.getItemsForPlayer(player)
      allPlayers.push(player);
    }
      
    return allPlayers;
  }


  static async savePlayer(player: Player): Promise<Player> {
    
    let results = await db().query<{id:number}>(
      `insert into player(id, name, password, money) 
        values(default, $1, $2, $3) 
        on conflict (name) do update set money = $3 returning id`,
      [player.name, player.password, player.#money]
    );
    
    let items = player.#items;
    for(let item of items) {
      Item.saveItem(item, player);
    }
    

    player.setId(results.rows[0].id);
    
    return player;
  }

  setId(id: number){
    this.#id = id;
    this.#checkPlayer();
  }

  static async playerExists(name: string): Promise<boolean> {
    const results = await db().query<{name: string}>(
        "select name from player where name = $1",
        [name]
    );
    return results.rows.length > 0;
  }

  #checkPlayer() {
    assert(this.name.length > 0, "Name must be be more than 0 chars.");
    assert(this.name != null, "Name cannot be null");
    assert(this.password.length >= 8, "Password must be 8 or more characters");
    assert(this.#money >= 0, "Cannot have negative money.");
    assert(this.#totalClicks >= 0, "Cannot have negative clicks.");
    assert(this.#items != null, "Inventory array cannot be null");
    this.#items.forEach(element => 
      assert(element != null, "Items in inventory cannot be null")
    );
  }

  //tells us listener 
  registerListener(listener: Listener) {
    // 5. add the listener to the list of listeners
    this.#listeners.push(listener);

    // listener.notify()
  }

  unregisterListeners() {
    this.#listeners = [];
  }
  
  #checkInventory() {
    assert(this.#items != null, "Inventory array cannot be null");
  }

  addOrUpgradeItem(item: Item) {
    //If Player has enough money
    if (item.getCost() <= this.#money) {
      this.incrementCurrency((-1) * item.getCost());

      if (!this.getItems().includes(item)) {
        //Add to items if dont already have
        this.#items.push(item);
      }
      //upgrade / buy
      item.buy();
      
      this.#checkInventory(); 
    }

    //I've changed, tell listeners
    this.#notifyAll()
  }

  removeItem(item: Item) {
    this.#items = this.#items.filter(i => i !== item);

    this.#checkInventory();
  }

  incrementCurrency(val : number) {
    this.#money += val;
    this.#checkPlayer();

    this.#notifyAll();
  }

  validatePassword(password: string) {
    return password === this.password;
  }

  getItems() {
    return this.#items;
  }

  getMoney() {
    return this.#money;
  }

  getName() {
    return this.name;
  }
  
  setItems(items: Array<Item>) {
    this.#items = items;
  } 

  //9.5 notify all layers that changes happened 
  #notifyAll() {
    this.#listeners
    .forEach((l:Listener) => l.notify());
  }
}

export class InvalidPlayerNameException extends Error {}
export class InvalidDuplicateNameException extends Error {}
export class InvalidPasswordException extends Error {}
