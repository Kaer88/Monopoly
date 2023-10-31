import Modal from "./Modal.js";

export default class BuildModal extends Modal{
  #player;

  constructor(player) {
    super()
    this.#player = player;
  }

  initDomElement() {
    const container = document.createElement("DIV");
    container.style.height = "100%";
    container.style.width = "100%";
    container.innerHTML = "teszt!"
    this.domElement.children[0].append(container);
  }
}
