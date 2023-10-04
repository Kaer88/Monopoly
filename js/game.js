import Board from "./board.js";

class Game {
  #board;
  #gameState;
  #domElement;

  constructor() {
    this.#board = new Board();
  }

   async init() {
    // this is the fn why this is async, awaiting causes no dom element render
    this.#board.start();
    const gameParentElement = document.createElement("DIV");
    gameParentElement.style.display = "flex";
    gameParentElement.id = "game";
    gameParentElement.append(this.#board.domElement);
    document.body.append(gameParentElement);

  }
}

const game = new Game();
await game.init()
