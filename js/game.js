import Board from "./board.js";
import ScoreBoard from "./scoreBoard.js";

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
    this.#board.start();
    this.#board.domElement.children[0].append(ScoreBoard.instance.domElement);
    gameParentElement.append(this.#board.domElement);


  }
}

const game = new Game();
await game.init();
