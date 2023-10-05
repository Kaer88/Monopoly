import Board from "./board.js";
import ScoreBoard from "./scoreBoard.js";
import DiceControls from "./controls.js";

class Game {
  #board;
  #gameState;
  #domElement;

  constructor() {
    this.#board = new Board();
  }

  async init() {
    // this is the fn why this is async, awaiting causes no dom element render
    const gameParentElement = document.createElement("DIV");
    gameParentElement.style.display = "flex";
    gameParentElement.id = "game-container";
    this.#domElement = gameParentElement;
    document.body.append(gameParentElement);
    const diceControl = new DiceControls();
    diceControl.initControls();
    gameParentElement.append(diceControl.domElement);

    // this.#scoreBoard.createDomElement();
    this.#board.start();
    gameParentElement.prepend(this.#board.domElement, ScoreBoard.instance.domElement);
  }
}

const game = new Game();
await game.init();
