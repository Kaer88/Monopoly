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
          field.propertyGroupId,
        ),
    );

    const controls = new Controls();
    controls.initControls();

    const boardDIV = document.createElement("DIV");
    boardDIV.id = "board";
    boardDIV.style.margin = "1em auto";
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
    middleContainer.style.alignItems = "center";
    middleContainer.style.justifyContent = "space-around";
    middleContainer.style.padding = "1rem";
    middleContainer.prepend(controls.domElement);

    // fill fieldTemplate array with field html objects

    const top = document.createElement("DIV");
    top.id = "top";
    top.style.display = "flex";
    top.style.gridArea = "top";
    top.style.height = "7rem";

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
    bottom.style.height = "7rem";

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

  #refreshScoreBoard() {
    return ScoreBoard.instance.updatePlayerState(
      this.#players,
      this.#currentPlayerIndex,
    );
  }

  get players() {
    return this.#players;
  }
  async start() {
    this.#initBoard();
    this.#currentPlayerIndex = 0;

    this.#players = this.#addPlayers([
      { name: "Sanyi", color: "red" },
      { name: "Peti", color: "orange" },
      { name: "Gerzson", color: "blue" },
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
    const currentPlayer = this.#players[this.#currentPlayerIndex];
    ScoreBoard.instance.newMessage(`${currentPlayer.name}. roll the dice`);

    await new Promise((resolve) => {
      const rollBtnHandler = () => {
        this.#diceRolled = diceRoll();
        ScoreBoard.instance.newMessage(`Dice rolled: ${this.#diceRolled}`);
        document.querySelector("#roll-btn").disabled = true;
        document
          .querySelector("#roll-btn")
          .removeEventListener("click", rollBtnHandler);
        setTimeout(() => resolve(), 800);
      };
      setTimeout(() => {
        document.querySelector("#roll-btn").disabled = false;
        document
          .querySelector("#roll-btn")
          .addEventListener("click", rollBtnHandler);
      }, 0);
    });

    // Jail mechanics
    const isDouble = this.#diceRolled.every(
      (dice) => dice === this.#diceRolled,
    );
    if (currentPlayer.turnsInJail > 0 && !isDouble) {
      const jailField = this.#fields[10];
      const gotOutOfJailRes = await currentPlayer.decide(
        jailField,
        this.#fields,
        this.#refreshScoreBoard,
      );

      if (!(await gotOutOfJailRes)) {
        currentPlayer.turnsInJail -= 1;
        if (this.#currentPlayerIndex === this.#players.length - 1) {
          this.#currentPlayerIndex = 0;
        } else {
          this.#currentPlayerIndex = ++this.#currentPlayerIndex;
        }
        this.#refreshScoreBoard();
        return this.#gameplayLoop();
      }
    }

    if (isDouble && currentPlayer.turnsInJail > 0) {
      currentPlayer.turnsInJail = 0;
      ScoreBoard.instance.newMessage(
        `${currentPlayer.name} rolled double and got out of jail!`,
      );
    }
    // check if player loops around the board + add money
    const diceSum = this.#diceRolled.reduce((acc, curr) => (acc += curr), 0);
    if (currentPlayer.currentField + diceSum >= 40) {
      currentPlayer.balance += 200;
      ScoreBoard.instance.newMessage(
        `${
          this.#players[this.#currentPlayerIndex].name
        } received money for looping around`,
      );
      this.#refreshScoreBoard();
    }

    // set player position on field according to the dice value
    setNextField(currentPlayer, this.#diceRolled, this.#fields);

    // update dom state
    this.#renderPlayers();

    // field info given to player method to take a buy/draw/pay tax etc
    const activePlayerField = this.#fields[currentPlayer.currentField];
    ScoreBoard.instance.newMessage(
      `${currentPlayer.name} arrived at ${activePlayerField.fieldName}`,
    );
    await currentPlayer.decide(
      activePlayerField,
      this.#fields,
      this.#refreshScoreBoard,
    );

    // post-move rerender of players
    this.#renderPlayers();

    // set next player
    if (this.#currentPlayerIndex === this.#players.length - 1) {
      this.#currentPlayerIndex = 0;
    } else {
      this.#currentPlayerIndex = ++this.#currentPlayerIndex;
    }
    this.#refreshScoreBoard();
    return this.#gameplayLoop();
  }
}
