import { fieldTemplate } from "./constants/fieldTemplate.js";
import Field from "./Field.js";
import Player from "./Player.js";
import diceRoll from "./util/diceRoll.js";
import setNextField from "./util/setNextField.js";
import ScoreBoard from "./ScoreBoard.js";
import Controls from "./Controls.js";
export default class Board {
  #fields = [];
  #players;
  #domElement;
  #diceRolled;
  #currentPlayerIndex = 0;

  get domElement() {
    return this.#domElement;
  }
  #initBoard() {
    this.#fields = fieldTemplate.map(
      (field) =>
        new Field(
          field.name,
          field.value,
          field.eventFn,
          field.penalties,
          field.buildPrice,
        ),
    );

    const controls = new Controls();
    controls.initControls();

    const boardDIV = document.createElement("DIV");
    boardDIV.id = "board";
    boardDIV.style.margin = "1em 3em";
    boardDIV.style.display = "grid";

    boardDIV.style.gridTemplateAreas = `
    "top top top top"
    "left middle middle right"
    "left middle middle right"
    "bottom bottom bottom bottom"
    `;
    const middleContainer = document.createElement("DIV");
    middleContainer.style.gridArea = "middle";
    middleContainer.style.display = "flex";
    middleContainer.style.alignItems = "center"
    middleContainer.style.justifyContent = "space-around"
    middleContainer.style.padding = "1rem";
    middleContainer.prepend(controls.domElement);

    // fill fieldTemplate array with field html objects

    const top = document.createElement("DIV");
    top.id = "top";
    top.style.display = "flex";
    top.style.gridArea = "top";

    const right = document.createElement("DIV");
    right.id = "right";
    right.style.display = "flex";
    right.style.gridArea = "right";
    right.style.flexDirection = "column";
    right.style.alignItems = "flex-end";

    const left = document.createElement("DIV");
    left.id = "right";
    left.style.display = "flex";
    left.style.gridArea = "left";
    left.style.flexDirection = "column-reverse";

    const bottom = document.createElement("DIV");
    bottom.id = "right";
    bottom.style.display = "flex";
    bottom.style.flexDirection = "row-reverse";
    bottom.style.gridArea = "bottom";

    boardDIV.append(middleContainer, top, right, left, bottom);

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

    this.#players = this.#addPlayers([
      { name: "Sanyi", color: "red" },
      { name: "Petike", color: "orange" },
    ]);
    this.#renderPlayers();
    ScoreBoard.instance.updatePlayerState(
      this.#players,
      this.#currentPlayerIndex,
    );

    await this.#gameplayLoop();
    console.log("gameplay loop end");
  }

  async #gameplayLoop() {
    if (this.#players.length === 1) return null;
    ScoreBoard.instance.newMessage(
      `${
        this.#players[this.#currentPlayerIndex].name
      }. roll the dice`,
    );

    await new Promise((resolve) => {
      const rollBtnHandler = () => {
        this.#diceRolled = diceRoll();
        document.querySelector("#roll-btn").disabled = true;
        document
          .querySelector("#roll-btn")
          .removeEventListener("click", rollBtnHandler);
        resolve();
      };
      setTimeout(() => {
        document.querySelector("#roll-btn").disabled = false;
        document
          .querySelector("#roll-btn")
          .addEventListener("click", rollBtnHandler);
      }, 0);
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
    //     currentPlayerIndexPosition + diceValue - this.#fieldTemplate.length,
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
    ScoreBoard.instance.newMessage(
      `${activePlayer.name} arrived at ${activePlayerField.fieldName}`,
    );

    console.log("event start:", this.#players, this.#fields);
    await activePlayer.decide(activePlayerField);
    console.log("event end:", this.#players, this.#fields);

    // set next player
    if (this.#currentPlayerIndex === this.#players.length - 1) {
      this.#currentPlayerIndex = 0;
    } else {
      this.#currentPlayerIndex = ++this.#currentPlayerIndex;
    }
    ScoreBoard.instance.updatePlayerState(
      this.#players,
      this.#currentPlayerIndex,
    );
    return this.#gameplayLoop();
  }
}
