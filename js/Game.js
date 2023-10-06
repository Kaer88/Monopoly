import Board from "./Board.js";
import ScoreBoard from "./ScoreBoard.js";


/*
TODO:
- Kill player function for board, hand down to player -> event fn
- finish property event
- card events, buttons as card
- station/utility events
- field groups, field group colors
- name input, color picker and start game button
- tax event
- sell property, push property references to an array on player instance
- jail, go to jail, get out of jail card
- make it look nice
- function at the end of gameplay loop to check if any player's balance < 0

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
