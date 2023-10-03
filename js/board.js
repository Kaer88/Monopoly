import { fields } from "./constants/fields.js";
import Field from "./field.js";
import Player from "./player.js";
import DiceControls from "./controls.js";
import diceRoll from "./util/diceRoll.js";
export default class Board {
  #fields = [];
  #players;
  #domElement;
  #diceRolled;
  #currentPlayer;

  #initBoard() {
    const boardDIV = document.createElement("DIV");
    boardDIV.id = "board";
    boardDIV.style.height = "50rem";
    boardDIV.style.width = "50rem";
    boardDIV.style.display = "flex";
    boardDIV.style.flexWrap = "wrap";
    boardDIV.style.border = "1px solid black";
    boardDIV.style.margin = "auto 5em";
    document.body.append(boardDIV);

    this.#fields = fields
      .map((field) => new Field(field.name, field.value, field.eventFn))
      .map((fieldOfClass) => {
        return fieldOfClass.domElement;
      });
    this.#domElement = boardDIV;
    this.#fields.forEach((field) => boardDIV.append(field));
  }

  /**
   *
   * @param playersList {Object[]}
   * @returns {Player[]}
   */
  #addPlayers(playersList) {
    return playersList.map((player) => new Player(player.name, player.color));
  }
  #renderPlayers() {
    this.#players.forEach((player) => {
      console.log(player.domElement.parentElement);
      player.domElement.parentElement !== null && player.domElement.remove();
      this.#fields[player.currentField].children[1].append(player.domElement);
      console.log(player.domElement.parentElement);
    });
  }
  async start() {
    this.#initBoard();
    this.#currentPlayer = 0;
    const diceControl = new DiceControls();
    diceControl.initControls();

    document.body.append(diceControl.domElement);
    this.#players = this.#addPlayers([
      { name: "Sanyi", color: "red" },
      { name: "Kakadu Petike", color: "orange" },
    ]);
    this.#renderPlayers();
    await this.#gameplayLoop();
    console.log("gameplay loop end");
  }

  async #gameplayLoop() {
    if (this.#players.length === 1) return null;
    await new Promise((resolve) => {
      const rollBtnHandler = () => {
        this.#diceRolled = diceRoll();
        document
          .querySelector("#roll-btn")
          .removeEventListener("click", rollBtnHandler);
        resolve();
      };
      document
        .querySelector("#roll-btn")
        .addEventListener("click", rollBtnHandler);
    });
    const currentPlayerPosition =
      this.#players[this.#currentPlayer].currentField;
    const diceValue = this.#diceRolled.reduce((acc, curr) => (acc += curr));
    this.#players[this.#currentPlayer].movePlayer(
      currentPlayerPosition + diceValue,
    );
    this.#renderPlayers();
    if (this.#currentPlayer === this.#players.length - 1) {
      this.#currentPlayer = 0;
    } else {
      this.#currentPlayer = ++this.#currentPlayer;
    }
    return this.#gameplayLoop();
  }
}
