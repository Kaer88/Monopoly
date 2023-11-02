import Modal from "./Modal.js";
import getOwnedProperties from "./util/getOwnedProperties.js";

export default class TradeModal extends Modal {
  #properties;
  #currentPlayer;
  #players;
  #selfDomRef;

  constructor(players, currentPlayerIdx) {
    super();
    this.#properties = getOwnedProperties(players);
    this.#currentPlayer = players[currentPlayerIdx];
    this.#players = players;
  }

  initComponent() {
    const container = document.createElement("DIV");
    container.style.height = "100%";
    container.style.width = "100%";
    container.style.color = "black";
    this.#selfDomRef = container;
    this.domElement.children[0].append(container);
  }

  #renderPlayers() {
    const currentPlayerContainer = document.createElement("DIV");
    const nameP = document.createElement("P");
    const balanceP = document.createElement("P");
    const currentPropertiesDiv = document.createElement("DIV");

    nameP.textContent = this.#currentPlayer.name;
    

  }
}
