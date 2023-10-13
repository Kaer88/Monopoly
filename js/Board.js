import { fieldTemplate } from "./constants/fieldTemplate.js";
import Field from "./Field.js";
import Player from "./Player.js";
import diceRoll from "./util/diceRoll.js";
import setNextField from "./util/setNextField.js";
import ScoreBoard from "./ScoreBoard.js";
import Controls from "./Controls.js";
import barterModal from "./BarterModal.js";
export default class Board {
  #fields = [];
  #players;
  #domElement;
  #diceRolled = null;
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
          field.utilityFlag,
          field.stationFlag,
        ),
    );

    const controls = new Controls();
    controls.initControls();

    const boardDIV = document.createElement("DIV");
    boardDIV.id = "board";
    boardDIV.style.margin = "1em auto";
    boardDIV.style.display = "grid";
    boardDIV.style.position = "relative";

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
    ScoreBoard.instance.updatePlayerState();
  }

  get currentPlayerIndex() {
    return this.#currentPlayerIndex;
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
    ScoreBoard.instance.initPlayers(this.#players);
    ScoreBoard.instance.updatePlayerState(this.#currentPlayerIndex);

    await this.#gameplayLoop();
    console.log("gameplay loop end");
  }

  async #rollDice(currentPlayer) {
    return new Promise((resolve) => {
      ScoreBoard.instance.newMessage(`${currentPlayer.name}. roll the dice`);
      const rollBtnHandler = () => {
        this.#diceRolled = diceRoll();
        ScoreBoard.instance.newMessage(`Dice rolled: ${this.#diceRolled}`);
        document.querySelector("#roll-btn").disabled = true;
        document
          .querySelector("#roll-btn")
          .removeEventListener("click", rollBtnHandler);
        setTimeout(() => resolve(), 800);
      };
      // setTimeout to put adding event listeners at the end of the call stack
      setTimeout(() => {
        document.querySelector("#roll-btn").disabled = false;
        document
          .querySelector("#roll-btn")
          .addEventListener("click", rollBtnHandler);
      }, 0);
    });
  }

  async #gameplayLoop() {
    if (this.#players.length === 1) return null;
    console.log(this.#fields);
    console.log(this.#players);
    const currentPlayer = this.#players[this.#currentPlayerIndex];
    // jail path
    if (currentPlayer.turnsInJail > 0) {
      const jailField = this.#fields[10];
      // player decide on paying or using card
      const gotOutOfJailRes = await currentPlayer.decide(
        jailField,
        this.#fields,
        this.#refreshScoreBoard,
      );
      let gotOutOfJail = await gotOutOfJailRes;
      // refresh scoreboard if player got out of jail
      gotOutOfJail && this.#refreshScoreBoard();
      // roll dice to see if double, or for moving on board is got out of jail
      await this.#rollDice(currentPlayer);
      // check for double and set got out of jail variable to true if double
      const isDouble = this.#diceRolled.every(
        (dice) => dice === this.#diceRolled[0],
      );
      if (isDouble || gotOutOfJail) {
        currentPlayer.turnsInJail = 0;
        gotOutOfJail = true;
        ScoreBoard.instance.newMessage(
          `${currentPlayer.name} rolled double and got out of jail!`,
        );
      }
      // deduct one from days in prison, render, restart gameplay loop with next player
      if (!gotOutOfJail) {
        if (currentPlayer.turnsInJail === 1) {
          currentPlayer.balance -= 50;
          ScoreBoard.instance.newMessage(
            `${currentPlayer.name} jail time served and paid 50$ fine`,
          );
        }
        currentPlayer.turnsInJail -= 1;

        if (this.#currentPlayerIndex === this.#players.length - 1) {
          this.#currentPlayerIndex = 0;
        } else {
          this.#currentPlayerIndex = ++this.#currentPlayerIndex;
        }
        ScoreBoard.instance.nextPlayer()
        this.#diceRolled = null;
        this.#refreshScoreBoard();
        return this.#gameplayLoop();
      }
    }

    this.#diceRolled === null && (await this.#rollDice(currentPlayer));

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
      this.#diceRolled,
    );

    // post-move rerender of players and score
    this.#renderPlayers();
    this.#refreshScoreBoard();

    // buy/sell phase, and end turn

    await new Promise((resolve) => {
      const barterBtn = document.querySelector("#sell-btn");
      const endTurnBtn = document.querySelector("#endturn-btn");

      const barterFn = () => {
        const modal = new barterModal(this.#players);
        this.#domElement.append(modal.domElement);
      };

      const endTurnFn = () => {
        endTurnBtn.removeEventListener("click", endTurnFn);
        endTurnBtn.disabled = true;
        barterBtn.removeEventListener("click", barterFn);
        barterBtn.disabled = true;
        resolve();
      };
      barterBtn.disabled = false;
      endTurnBtn.disabled = false;
      barterBtn.addEventListener("click", barterFn);
      endTurnBtn.addEventListener("click", endTurnFn);
    });

    // check for bankrupt players
    const bankruptPlayers = this.#players.filter(
      (player) => player.balance <= 0,
    );
    if (bankruptPlayers.length > 0) {
      bankruptPlayers.forEach((player) => {
        player.domElement.remove();
        player.properties.forEach((property) => property.setOwner(null));
        ScoreBoard.instance.newMessage(`${player.name} went bankrupt!`);
      });
    }
    this.#players = this.#players.filter((player) => player.balance > 0);

    // set next player
    if (this.#currentPlayerIndex === this.#players.length - 1) {
      this.#currentPlayerIndex = 0;
    } else {
      this.#currentPlayerIndex = ++this.#currentPlayerIndex;
    }
    ScoreBoard.instance.nextPlayer()
    this.#diceRolled = null;
    this.#refreshScoreBoard();
    return this.#gameplayLoop();
  }
}
