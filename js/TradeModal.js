import Modal from "./Modal.js";
import getOwnedProperties from "./util/getOwnedProperties.js";

export default class TradeModal extends Modal{
  #properties;
  #currentPlayer;
  #players

  constructor(players, currentPlayerIdx) {
    super()
    this.#properties = getOwnedProperties(players);
    this.#currentPlayer = players[currentPlayerIdx];
    this.#players = players;
  }

  initComponent() {
    const container = document.createElement("DIV");
    container.style.height = "100%";
    container.style.width = "100%";
    container.style.color = "black"
    this.domElement.children[0].append(container);
    console.log(this.#properties)
  }
}
