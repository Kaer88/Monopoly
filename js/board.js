import { fields } from "./constants/fields.js";
import Field from "./field.js";
import Player from "./player.js";


export default class Board {
  #fields = [];
  #players;
  #domElement;

  #generateBoard() {
    const boardDIV = document.createElement("DIV");
    boardDIV.id = "board";
    boardDIV.style.height = "50rem";
    boardDIV.style.width = "50rem";
    boardDIV.style.display = "flex";
    boardDIV.style.flexWrap = "wrap";
    boardDIV.style.border = "1px solid black";
    boardDIV.style.margin = "auto 5em";
    document.body.append(boardDIV);

    this.#fields = fields
      .map((field) => new Field(field.name, field.value, field.eventFn))
      .map((fieldOfClass) => {
        return fieldOfClass.domElement;
      });
    this.#domElement = boardDIV;
    this.#fields.forEach((field) => boardDIV.append(field));
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
      console.log(player.domElement.parentElement);
      player.domElement.parentElement !== null && player.domElement.remove();
      this.#fields[player.currentField].children[1].append(player.domElement);
      console.log(player.domElement.parentElement);
    });
  }
  start() {
    this.#generateBoard();
    this.#players = this.#addPlayers([
      { name: "Sanyi", color: "red" },
      { name: "Kakadu Petike", color: "orange" },
    ]);
    this.#renderPlayers();
  }
}
