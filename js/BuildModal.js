import Modal from "./Modal.js";

export default class BuildModal extends Modal{
  #players;
  #currentPlayerIdx;

  constructor(players, currentPlayerIdx) {
    super()
    this.#players = players;
    this.#currentPlayerIdx = currentPlayerIdx;
  }

  initDomElement() {
    const container = document.createElement("DIV");
    container.style.height = "100%";
    container.style.width = "100%";
    container.innerHTML = "teszt!"
    this.domElement.append(container);
  }
}
