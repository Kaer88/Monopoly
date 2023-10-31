import Modal from "./Modal.js";

export default class BarterModal extends Modal{
  #players;
  #currentPlayerIdx;

  constructor(players, currentPlayerIdx) {
    super()
    this.#players = players;
    this.#currentPlayerIdx = currentPlayerIdx;
  }

  initDomElement() {
    const container = document.createElement("DIV");
    container.style.height = "500px";
    container.style.width = "500px";
    container.style.color = "black"
    container.innerHTML = "<p>teszt!</p>"
    this.domElement.children[0].append(container);
  }
}
