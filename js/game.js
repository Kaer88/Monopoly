import Board from "./board.js";


class Game {
  #diceRolled;
}



class Player {
  #balance;
  #isInJail;
  #position;
}

const board = new Board();
board.start();
