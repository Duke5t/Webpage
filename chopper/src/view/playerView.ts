import Player from "../model/player.ts"
import PlayerController from "../controller/playerController.ts"
import type Listener from "../model/listener.ts"


export default class PlayerView implements Listener{
    #player: Player;
    // #teamEl: HTMLUListElement;
    #controller: PlayerController;
        
    //HTML Elements
    #goldAmountEl!: HTMLElement;
    #treeButton!: HTMLButtonElement;
    #axeButton!: HTMLButtonElement;
    #chainsawButton!: HTMLButtonElement;
    #woodpeckerButton!: HTMLButtonElement;
    #lumberjackButton!: HTMLButtonElement;
    

    constructor(player: Player, controller: PlayerController) {
        // 4. bind ourselves to the domain model instance
        this.#player = player;
        this.#controller = controller;
        
        // 6. Start setting up the actual view
        this.setUpView();

        this.#player.registerListener(this);
        this.notify();
    }


    // 10. Responding to change event from player class (DOMAIN)
    notify() {
        this.#goldAmountEl.textContent = this.#player.getMoney().toString();

        const items = this.#controller.getItems();

        //iterate through all player items and update costs and counts 
        items.forEach(item => {

            const id = item.getName().toLowerCase();

            const countEl = document.getElementById(`${id}-count`);
            const costEl = document.getElementById(`${id}-cost`);

            if (countEl) {
                countEl.textContent = item.getCount().toString();
            }

            if (costEl) {
                costEl.textContent = item.getCost().toString();
            }
        });   
    }
    
    setUpView() {
        // POPULATE TREE  
        document.querySelector("#click-container")!.innerHTML = 
        `
        <button id="tree" class="button"><img class="icon"src="images/tree.png"></img></button>
        `      
        //Bind Tree button to controller
        document.querySelector("#tree")! 
        .addEventListener('click',  this.#controller.clickTree.bind(this.#controller));

        // TOOLS
        const toolUpgrades = [
            { id: "axe", name: "Axe", icon: "images/axe.png", method: "axeMethod" },
            { id: "twomansaw", name: "Two-man Saw", icon: "images/two-man-saw.png", method: "twomansawMethod" },
            { id: "chainsaw", name: "Chainsaw", icon: "images/chainsaw.png", method: "chainsawMethod" },
            { id: "ponsse", name: "Ponsse", icon: "images/ponsse.png", method: "ponsseMethod" },
            { id: "helicopter", name: "Helicopter", icon: "images/helicopter.png", method: "helicopterMethod" }
            ];

        this.generateButtons("#upgrade-container", toolUpgrades);

        // TEAM
        const teamUpgrades = [
            { id: "woodpecker", name: "Woodpecker", icon: "images/woodpecker.png", method: "woodpeckerMethod" },
            { id: "lumberjack", name: "Lumberjack", icon: "images/lumberjack.png", method: "lumberjackMethod" },
            { id: "paulbunyan", name: "Paul Bunyan", icon: "images/paulbunyan.png", method: "paulbunyanMethod" },
            { id: "beaver", name: "Beaver", icon: "images/beaver.png", method: "beaverMethod" },
            { id: "godzilla", name: "Godzilla", icon: "images/godzilla.png", method: "godzillaMethod" }
            ];
        this.generateButtons("#team-container", teamUpgrades);

        //querySelector locates object based on html id
        // ! says item is guarenteed not to be null
        
        //SetUp HTML Elements        
        this.#goldAmountEl = document.getElementById("gold-amount")!;
        this.#treeButton = document.getElementById("tree") as HTMLButtonElement;
        // this.#axeButton = document.getElementById("axe") as HTMLButtonElement;
        // this.#chainsawButton = document.getElementById("chainsaw") as HTMLButtonElement;
        // this.#woodpeckerButton = document.getElementById("woodpecker") as HTMLButtonElement;
        // this.#lumberjackButton = document.getElementById("lumberjack") as HTMLButtonElement;

        this.#goldAmountEl.textContent = '0';

        // Bind logout button
        document.getElementById("logout-btn")!
            .addEventListener("click", this.#controller.logout.bind(this.#controller));


        // 7. Connect the button on the screen to the controller


        //EQUIVALENT

        //Bind AxeUpgrade button to controller
        //USING BIND : binds 'this' to playerController instance
        //wherever this function is called. (it could be called somewhere where 'this' is different)

    }

    generateButtons(containerId: string, upgrades: any[]) {

        const container = document.querySelector(containerId)!;

        container.innerHTML = "";

        upgrades.forEach(upgrade => {

            const button = document.createElement("button");
            button.id = upgrade.id;
            button.className = "button";

            button.innerHTML = `
                <img class="icon" src="${upgrade.icon}">
                <span id="${upgrade.id}-count" class="item-count">0</span>
                <span id="${upgrade.id}-cost" class="cost-count">0</span>
            `;

            // bind controller method dynamically
            button.addEventListener(
                "click",
                () => (this.#controller as any)[upgrade.method]()
            );

            container.appendChild(button);

        });
    }

}