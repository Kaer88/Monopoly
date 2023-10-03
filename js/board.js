import { fields } from "./constants/fields.js";
import Field from "./field.js";
import Player from "./player.js";
import DiceControls from "./controls.js";
import diceRoll from "./util/diceRoll.js";
import getNextField from "./util/getNextField.js";
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
      player.domElement.parentElement !== null && player.domElement.remove();
      this.#fields[player.currentField].children[1].append(player.domElement);
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
        console.log(this.#diceRolled);
        resolve();
      };
      document
        .querySelector("#roll-btn")
        .addEventListener("click", rollBtnHandler);
    });
    getNextField(
      this.#players,
      this.#currentPlayer,
      this.#diceRolled,
      this.#fields,
    );
    // Dobott érték alapján mező beállítása az adott playeren
    // const currentPlayerPosition =
    //   this.#players[this.#currentPlayer].currentField;
    // const diceValue = this.#diceRolled.reduce((acc, curr) => (acc += curr));
    // let targetField;
    // if (diceValue + currentPlayerPosition > 36) {
    //   targetField = Math.abs(
    //     currentPlayerPosition + diceValue - this.#fields.length,
    //   );
    // } else {
    //   targetField = currentPlayerPosition + diceValue;
    // }
    // this.#players[this.#currentPlayer].movePlayer(targetField);

    this.#renderPlayers();

    // következő játékos beállítása
    if (this.#currentPlayer === this.#players.length - 1) {
      this.#currentPlayer = 0;
    } else {
      this.#currentPlayer = ++this.#currentPlayer;
    }
    return this.#gameplayLoop();
  }
}
