import Board from "./Board.js";
import ScoreBoard from "./ScoreBoard.js";

class Game {
  #board;
  #gameState;
  #domElement;

  constructor() {
    this.#board = new Board();
  }

  init() {
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
