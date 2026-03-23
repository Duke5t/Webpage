
import type PlayerController from "../controller/playerController";
import { InvalidPlayerNameException } from "../model/player";
import { InvalidDuplicateNameException } from "../model/player";
import { InvalidPasswordException } from "../model/player";


export default class LoginView {
  #controller: PlayerController;
  #loginSelect: HTMLDialogElement;


  constructor(controller: PlayerController) {
    this.#controller = controller;
    this.#loginSelect = document.createElement("dialog");

    this.#loginSelect.innerHTML = `
      <h2>Welcome to Chopper Idle</h2>
      <span id="error"></span><br />
      
      <button class="login-btn" id="create-account">Create Account</button>
      <button class="login-btn" id="login">Login to Existing Account</button>
    `
    this.#loginSelect.querySelector("#create-account")!
      .addEventListener("click", () => this.#createPlayer())
    this.#loginSelect.querySelector("#login")!
      .addEventListener("click", () => this.#loginScreen())

    document.body.appendChild(this.#loginSelect)

    this.#loginSelect.showModal();
  }


  #loginScreen() {
    this.#loginSelect.innerHTML = `
      <h3>LOGIN TO ACCOUNT</h3> 
      <label for="name">Username</label>
      <input type="text" id="username" />
      <br></br>
      <label for="pass">Password</label>
      <input type="password" id="password" />
      <br></br>
      <span id="error"></span><br />
      <button class="login-btn" id="player">Login</button>
      <button class="login-btn" id="cancel">Cancel</button>
    `
    this.#loginSelect.querySelector("#player")!
      .addEventListener("click", () => this.#login())
    this.#loginSelect.querySelector("#cancel")!
      .addEventListener("click", () => this.#restart())
    
  }

  async #login() {

    let name = this.#loginSelect.querySelector<HTMLInputElement>("input[id='username']")!.value;
    let password = this.#loginSelect.querySelector<HTMLInputElement>("input[id='password']")!.value;
    
    // Resets any previous error styling
    this.#loginSelect.querySelector("#username")!.removeAttribute("style");
    this.#loginSelect.querySelector("#password")!.removeAttribute("style");
    this.#loginSelect.querySelector("#error")!.textContent = "";
 
    try {
      await this.#controller.loginPlayer(name, password);

      document.body.removeChild(this.#loginSelect);
    } catch (e: any) {
      // loginPlayer throws a plain Error with a message for bad credentials
      this.#loginSelect.querySelector("#username")!
        .setAttribute("style", "border-color:red;");
      this.#loginSelect.querySelector("#password")!
        .setAttribute("style", "border-color:red;");
      this.#loginSelect.querySelector("#error")!
        .textContent = "Invalid username or password.";
    }
  }
  
  #createPlayer() {
    //Change password input type back to 'password' before submission
    this.#loginSelect.innerHTML = `
      <h3>CREATE PLAYER</h3>
      <label for="nickname">Username</label>
      <input type="text" id="username" />
      <br>
      <label for="nickname">Password</label>
      <input type="password" id="password" />
      <br>
      <span id="error"></span><br />
      <button class="login-btn" id="add-player">Create Player</button>
      <button class="login-btn" id="cancel">Cancel</button>
    `
    this.#loginSelect.querySelector("#add-player")!
      .addEventListener("click", () => this.#addPlayer())
    this.#loginSelect.querySelector("#cancel")!
      .addEventListener("click", () => this.#restart())
  }

  #restart() {
    document.body.removeChild(this.#loginSelect)
    new LoginView(this.#controller);
  }

  // On button click:
  // This has the responsibility of getting input and providing it
  // to the controller class.
  async #addPlayer() {
    
    let name = this.#loginSelect.querySelector<HTMLInputElement>("#username")!.value;
    let password = this.#loginSelect.querySelector<HTMLInputElement>("#password")!.value;
    try {
      await this.#controller.addPlayer(name, password);

      // assuming success, remove the dialog from the page  
      document.body.removeChild(this.#loginSelect);

      // this.#controller.gameSetup();
    } catch (e: any) {
      // handle InvalidNameExceptions
      if (e instanceof InvalidPlayerNameException) {
        this.#loginSelect.querySelector("#username")!
          .setAttribute('style', 'border-color:red;');
        this.#loginSelect.querySelector("#error")!
          .textContent = "Invalid player name, player names must have at least one letter (e.g., Bob).";
      } else if (e instanceof InvalidDuplicateNameException) {
        this.#loginSelect.querySelector("#username")!
          .setAttribute('style', 'border-color:red;');
        this.#loginSelect.querySelector("#error")!
          .textContent = "Invalid player name, player name already in use.";
      } else if (e instanceof InvalidPasswordException) {
        this.#loginSelect.querySelector("#password")!
          .setAttribute('style', 'border-color:red;');
        this.#loginSelect.querySelector("#error")!
          .textContent = "Invalid password, passwords must have at least eight (8) characters (e.g., Password!).";

      }else {
        // unexpected errors can be logged so that we can add them to the 
        // try catch or figure out what the problem was.
        console.log("unexpected error " + e);
      }
    }
  }

}
