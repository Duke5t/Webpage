import Player from "../model/player.ts";
import {InvalidPlayerNameException} from "../model/player.ts";
import {InvalidDuplicateNameException} from "../model/player.ts";
import {InvalidPasswordException} from "../model/player.ts";
import Clicker from "../model/clicker.ts";
import Axe from "../model/axe.ts";
import Twomansaw from "../model/twomansaw.ts";
import Chainsaw from "../model/chainsaw.ts";
import Ponsse from "../model/ponsse.ts";
import Helicopter from "../model/helicopter.ts";
import Woodpecker from "../model/woodpecker.ts";
import Lumberjack from "../model/lumberjack.ts";
import Paulbunyan from "../model/paulbunyan.ts";
import Beaver from "../model/beaver.ts";
import Godzilla from "../model/godzilla.ts";
import PlayerView from "../view/playerView.ts";
import LoginView from "../view/loginView.ts";
import db from '../model/connection.ts';



export default class PlayerController {
    #player?: Player;
    #playerView?: PlayerView;
    #clicker?: Clicker;
    #autoClickerInterval?: number;
    #salt: string = "brules01";

    #axe?: Axe;
    #twomansaw?: Twomansaw;
    #chainsaw?: Chainsaw;
    #ponsse?: Ponsse;
    #helicopter?: Helicopter;
    #woodpecker?: Woodpecker;
    #lumberjack?: Lumberjack;
    #paulbunyan?: Paulbunyan;
    #beaver?: Beaver;
    #godzilla?: Godzilla;

    #loginView?: LoginView;

    //4. Initialize its own internal state(player)
    //&. Initialize the view, connect the view with the domain object
    constructor() {
        //I want to ask: are there any players in the db right now?
        let playerPromise = Player.getAllPlayers();                
        
        //'.then()' forces us to call await to finish
        playerPromise.then((allPlayers : Player[]) : void => {
            this.#loginView = new LoginView(this);
            // if(allPlayers.length <= 1){
            //     //if there are no players in db, we pop up to make player view
            // } else {
            //     //If there are players, we choose the first 1?
            //     this.#player = allPlayers[0];

            //     this.#clicker = new Clicker(this.#player!);

            //     this.#axe = new Axe("Axe", this.#player!);
            //     this.#twomansaw = new Twomansaw("Twomansaw", this.#player!);
            //     this.#chainsaw = new Chainsaw("Chainsaw", this.#player!)
            //     this.#ponsse = new Ponsse("Ponsse", this.#player!);
            //     this.#helicopter = new Helicopter("Helicopter", this.#player!);

            //     this.#woodpecker = new Woodpecker("Woodpecker", this.#player!)
            //     this.#lumberjack = new Lumberjack("Lumberjack", this.#player!)
            //     this.#paulbunyan = new Paulbunyan("Paulbunyan", this.#player!);
            //     this.#beaver = new Beaver("Beaver", this.#player!);
            //     this.#godzilla = new Godzilla("Godzilla", this.#player!);
                
            //     this.#playerView = new PlayerView(this.#player, this);
            // }
        })
    }
 
    
    async addPlayer(name: string, password: string) {
        if (name.trim().length === 0) {
            throw new InvalidPlayerNameException();
        }
        if (password.length < 6) {
            throw new InvalidPasswordException();
        }
        if (await Player.playerExists(name)) {
            throw new InvalidDuplicateNameException();
        }
        
        let hashedPass = await this.#hashPassword(password);
        
        this.#player = new Player(name, hashedPass);

        await Player.savePlayer(this.#player);

        this.gameSetup();
    }
    
    async gameSetup() {
        this.#loginView = undefined;
        const allItems = await db().query(`select * from item`);

        this.#clicker = new Clicker(this.#player!);
 
        let axeRows = await db().query<{count: number}>(`select * from item where itemType = 'axe' and ownedBy = $1`, [this.#player!.getName()]);
        
        if (axeRows.rows.length > 0) {
            this.#axe = new Axe("Axe", this.#player!, axeRows.rows[0].count);
        } else {
            this.#axe = new Axe("Axe", this.#player!);
        }

        let twomansawRows = await db().query<{count: number}>(`select * from item where itemType = 'twomansaw' and ownedBy = $1`, [this.#player!.getName()]);
        if (twomansawRows.rows.length > 0) {
            this.#twomansaw = new Twomansaw("Twomansaw", this.#player!, twomansawRows.rows[0].count);
        } else {
            this.#twomansaw = new Twomansaw("Twomansaw", this.#player!);
        }

        let chainsawRows = await db().query<{count: number}>(`select * from item where itemType = 'chainsaw' and ownedBy = $1`, [this.#player!.getName()]);
        if (chainsawRows.rows.length > 0) {
            this.#chainsaw = new Chainsaw("Chainsaw", this.#player!, chainsawRows.rows[0].count);
        } else {
            this.#chainsaw = new Chainsaw("Chainsaw", this.#player!);
        }

        let ponsseRows = await db().query<{count: number}>(`select * from item where itemType = 'ponsse' and ownedBy = $1`, [this.#player!.getName()]);
        if (ponsseRows.rows.length > 0) {
            this.#ponsse = new Ponsse("Ponsse", this.#player!, ponsseRows.rows[0].count);
        } else {
            this.#ponsse = new Ponsse("Ponsse", this.#player!);
        }

        let helicopterRows = await db().query<{count: number}>(`select * from item where itemType = 'helicopter' and ownedBy = $1`, [this.#player!.getName()]);
        if (helicopterRows.rows.length > 0) {
            this.#helicopter = new Helicopter("Helicopter", this.#player!, helicopterRows.rows[0].count);
        } else {
            this.#helicopter = new Helicopter("Helicopter", this.#player!);
        }

        let woodpeckerRows = await db().query<{count: number}>(`select * from item where itemType = 'woodpecker' and ownedBy = $1`, [this.#player!.getName()]);
        if (woodpeckerRows.rows.length > 0) {
            this.#woodpecker = new Woodpecker("Woodpecker", this.#player!, woodpeckerRows.rows[0].count);
        } else {
            this.#woodpecker = new Woodpecker("Woodpecker", this.#player!);
        }

        let lumberjackRows = await db().query<{count: number}>(`select * from item where itemType = 'lumberjack' and ownedBy = $1`, [this.#player!.getName()]);
        if (lumberjackRows.rows.length > 0) {
            this.#lumberjack = new Lumberjack("Lumberjack", this.#player!, lumberjackRows.rows[0].count);
        } else {
            this.#lumberjack = new Lumberjack("Lumberjack", this.#player!);
        }

        let paulbunyanRows = await db().query<{count: number}>(`select * from item where itemType = 'paulbunyan' and ownedBy = $1`, [this.#player!.getName()]);
        if (paulbunyanRows.rows.length > 0) {
            this.#paulbunyan = new Paulbunyan("Paulbunyan", this.#player!, paulbunyanRows.rows[0].count);
        } else {
            this.#paulbunyan = new Paulbunyan("Paulbunyan", this.#player!);
        }

        let beaverRows = await db().query<{count: number}>(`select * from item where itemType = 'beaver' and ownedBy = $1`, [this.#player!.getName()]);
        if (beaverRows.rows.length > 0) {
            this.#beaver = new Beaver("Beaver", this.#player!, beaverRows.rows[0].count);
        } else {
            this.#beaver = new Beaver("Beaver", this.#player!);
        }

        let godzillaRows = await db().query<{count: number}>(`select * from item where itemType = 'godzilla' and ownedBy = $1`, [this.#player!.getName()]);
        if (godzillaRows.rows.length > 0) {
            this.#godzilla = new Godzilla("Godzilla", this.#player!, godzillaRows.rows[0].count);
        } else {
            this.#godzilla = new Godzilla("Godzilla", this.#player!);
        }


        this.#playerView = new PlayerView(this.#player!, this);
        this.startAutoClicking();
    }

    async loginPlayer(name: string, password: string) {
        const valid = await this.validateUser(name, password);

        if (!valid) {
            throw new Error("Invalid username or password.");
        }
        const allPlayers = await Player.getAllPlayers();
        let match = undefined;
        for (let player of allPlayers) {
            if (player.getName() === name) {
                match = player;
            }
        }
        this.#player = match!;
   
        await this.gameSetup();  
    }
    
    async validateUser(name: string, password: string) : Promise<Boolean> {
        const allPlayers = await Player.getAllPlayers();
        let match = undefined;
        for (let player of allPlayers) {
            if (player.getName() === name) {
                match = player;
            }
        }         
        if(!match) {
            return false;
        }

        const hashedPass = await this.#hashPassword(password); 

        return match.validatePassword(hashedPass);        
    }

    async #hashPassword(password: string): Promise<string> {
        const enc = new TextEncoder();
        const salt = enc.encode(this.#salt);
        const keyMaterial = await crypto.subtle.importKey(
            "raw",
            enc.encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveBits", "deriveKey"]
        );

        const derivedBits = await crypto.subtle.deriveBits(
            { name: "PBKDF2", 
            salt, 
            iterations: 1000, 
            hash: "SHA-256" },
            keyMaterial,
            256
        );

        const hashArray = new Uint8Array(derivedBits);
        
        //this works even though VS code is pretty stubbornly telling me it doesnt (hours i wont get back)
        const hashHex = hashArray.toHex();

        return hashHex;
    }    
    
    startAutoClicking() {
        if (this.#autoClickerInterval !== undefined) {
            clearInterval(this.#autoClickerInterval);
        }
        this.#autoClickerInterval = setInterval(() => {

           const items = this.#player?.getItems();

           items?.forEach(item => {
            //Sets the autoclick value per second
            //Non autoclicking items have rate of 0.
            //10x faster update, rate decreased by 10 times.
            const value = item.getClickPower() * item.getRate();

            this.#player?.incrementCurrency(value);
           });

        }, 1000) //one second
    }

    logout() {
        //Clears autoclicking
        if (this.#autoClickerInterval !== undefined) {
            clearInterval(this.#autoClickerInterval);
            this.#autoClickerInterval = undefined;
        }
        //clears all listeners
        this.#player?.unregisterListeners();

        // Clear all game state
        this.#player = undefined;
        this.#clicker = undefined;
        this.#axe = undefined;
        this.#twomansaw = undefined;
        this.#chainsaw = undefined;
        this.#ponsse = undefined;
        this.#helicopter = undefined;
        this.#woodpecker = undefined;
        this.#lumberjack = undefined;
        this.#paulbunyan = undefined;
        this.#beaver = undefined;
        this.#godzilla = undefined;
        this.#playerView = undefined;

        // Clear the game UI containers so the next player starts fresh
        document.querySelector("#click-container")!.innerHTML = "";
        document.querySelector("#upgrade-container")!.innerHTML = "";
        document.querySelector("#team-container")!.innerHTML = "";
        document.getElementById("gold-amount")!.textContent = "";

        const staleDialog = document.querySelector("dialog");
        if (staleDialog) {
            document.body.removeChild(staleDialog);
        }

        this.#loginView = new LoginView(this);
    }

    getItems() {
        return [
            this.#axe!,
            this.#twomansaw!,
            this.#chainsaw!,
            this.#ponsse!,
            this.#helicopter!,
            this.#woodpecker!,
            this.#lumberjack!,
            this.#paulbunyan!,
            this.#beaver!,
            this.#godzilla!,
        ];
    }

    async axeMethod() {
        this.#player!.addOrUpgradeItem(this.#axe!);
        await this.#persist();
    }

    async twomansawMethod() {
        this.#player!.addOrUpgradeItem(this.#twomansaw!);
        await this.#persist();
    }

    async chainsawMethod() {
        this.#player!.addOrUpgradeItem(this.#chainsaw!);
        await this.#persist();
    }

    async ponsseMethod() {
        this.#player!.addOrUpgradeItem(this.#ponsse!);
        await this.#persist();
    }

    async helicopterMethod() {
        this.#player!.addOrUpgradeItem(this.#helicopter!);
        await this.#persist();
    }


    
    async woodpeckerMethod() {
        this.#player!.addOrUpgradeItem(this.#woodpecker!);
        await this.#persist();
    }
    async lumberjackMethod() {
        this.#player!.addOrUpgradeItem(this.#lumberjack!);
        await this.#persist();
    }
    async paulbunyanMethod() {
        this.#player!.addOrUpgradeItem(this.#paulbunyan!);
        await this.#persist();
    }
    async beaverMethod() {
        this.#player!.addOrUpgradeItem(this.#beaver!);
        await this.#persist();
    }
    async godzillaMethod() {
        this.#player!.addOrUpgradeItem(this.#godzilla!);
        await this.#persist();
    }

    async #persist() {
        await Player.savePlayer(this.#player!);
    }

    clickTree() {
        this.#clicker!.click()
    }
}
