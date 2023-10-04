import { fields } from "./constants/fields.js";
import Field from "./Field.js";
import Player from "./player.js";
import DiceControls from "./controls.js";
import diceRoll from "./util/diceRoll.js";
import setNextField from "./util/setNextField.js";
import ScoreBoard from "./scoreBoard.js";
export default class Board {
  #fields = [];
  #players;
  #domElement;
  #diceRolled;
  #currentPlayerIndex;

  get players() {
    return this.#players;
  }
  get domElement() {
    return this.#domElement;
  }
  #initBoard() {
    this.#fields = fields.map(
      (field) => new Field(field.name, field.value, field.eventFn),
    );

    const boardDIV = document.createElement("DIV");
    boardDIV.id = "board";
    boardDIV.style.height = "70rem";
    boardDIV.style.width = "50rem";
    boardDIV.style.margin = "auto 5em";
    // fill fields array with field html objects

    /*
     * ezt még át kell gondolni, griddel bombabiztosabb lenne
     * */
    const top = document.createElement("DIV");
    top.id = "top";
    top.style.border = "1px solid black";
    top.style.height = "7rem";
    top.style.display = "flex";

    const right = document.createElement("DIV");
    right.id = "right";
    right.style.border = "1px solid black";
    right.style.height = "7rem";
    right.style.width = "40rem";
    right.style.display = "flex";

    const left = document.createElement("DIV");
    left.id = "right";
    left.style.border = "1px solid black";
    left.style.height = "7rem";
    left.style.width = "40rem";
    left.style.display = "flex";

    const bottom = document.createElement("DIV");
    bottom.id = "right";
    bottom.style.border = "1px solid black";
    bottom.style.height = "7rem";
    bottom.style.display = "flex";
    bottom.style.flexDirection = "reverse";

    // rotate lanes with transform
    right.style.transform =
      "rotate(90deg) translateY(-26.5rem) translateX(16.5rem)";
    left.style.transform =
      "rotate(-90deg) translateY(-16.5rem) translateX(-9.4rem)";
    bottom.style.transform = "translateY(25.9rem) rotate(180deg)";

    boardDIV.append(top);
    boardDIV.append(right);
    boardDIV.append(left);
    boardDIV.append(bottom);

    this.#domElement = boardDIV;

    this.#fields.slice(0, 11).forEach((field) => top.append(field.domElement));
    this.#fields
      .slice(11, 20)
      .forEach((field) => right.append(field.domElement));
    this.#fields
      .slice(20, 31)
      .forEach((field) => bottom.append(field.domElement));
    this.#fields
      .slice(31, 40)
      .forEach((field) => left.append(field.domElement));

    // this.#fields.forEach((field) => boardDIV.append(field));
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
      this.#fields[player.currentField].domElement.children[1].append(
        player.domElement,
      );
    });
  }
  async start() {
    this.#initBoard();
    this.#currentPlayerIndex = 0;
    const diceControl = new DiceControls();
    diceControl.initControls();

    document.body.append(diceControl.domElement);
    this.#players = this.#addPlayers([
      { name: "Sanyi", color: "red" },
      { name: "Petike", color: "orange" },

    ]);
    this.#renderPlayers();
    ScoreBoard.instance.updatePlayerState(this.#players)

    await this.#gameplayLoop();
    console.log("gameplay loop end");
  }

  async #gameplayLoop() {
    if (this.#players.length === 1) return null;
    ScoreBoard.instance.newMessage(
      `Current player: ${this.#players[this.#currentPlayerIndex].name}. Please roll the dice`,
    );

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
    ScoreBoard.instance.newMessage(`Dice rolled: ${this.#diceRolled}`);

    // set player position on field according to the dice value

    setNextField(
      this.#players,
      this.#currentPlayerIndex,
      this.#diceRolled,
      this.#fields,
    );

    // const currentPlayerIndexPosition =
    //   this.#players[this.#currentPlayerIndex].currentField;
    // const diceValue = this.#diceRolled.reduce((acc, curr) => (acc += curr));
    // let targetField;
    // if (diceValue + currentPlayerIndexPosition > 37) {
    //   targetField = Math.abs(
    //     currentPlayerIndexPosition + diceValue - this.#fields.length,
    //   );
    // } else {
    //   targetField = currentPlayerIndexPosition + diceValue;
    // }
    // this.#players[this.#currentPlayerIndex].movePlayer(targetField);

    // update dom state
    this.#renderPlayers();

    // field info given to player method to take a buy/draw/pay tax etc
    const activePlayer = this.#players[this.#currentPlayerIndex];
    const activePlayerField = this.#fields[activePlayer.currentField];

    console.log("event start:", this.#players, this.#fields);
    await activePlayer.decide(activePlayerField);
    console.log("event end:", this.#players, this.#fields);

    // set next player
    if (this.#currentPlayerIndex === this.#players.length - 1) {
      this.#currentPlayerIndex = 0;
    } else {
      this.#currentPlayerIndex = ++this.#currentPlayerIndex;
    }

    return this.#gameplayLoop();
  }
}
