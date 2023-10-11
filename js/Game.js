import Board from "./Board.js";
import ScoreBoard from "./ScoreBoard.js";


/*
TODO:
- card events, buttons as card
- ability to buy house on all properties in the property group if on any of the property group fields
- station/utility events
- name input, color picker and start game button
- sell property dialog
- make it look nice
- BUG: can go below 0 with paying prison fine and still roll

 */
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
