export default class DiceControls {
  #domElement;

  constructor() {}

  initControls() {
    const buttonContainer = document.createElement("DIV");
    const rollButton = document.createElement("BUTTON");
    rollButton.textContent = "Roll the dice!";
    rollButton.id = "roll-btn"
    buttonContainer.append(rollButton);

    buttonContainer.style.position = "absolute";
    buttonContainer.style.right = "5px";
    buttonContainer.style.top = "5px";

    buttonContainer.height = "10em";
    buttonContainer.width = "10em";
    buttonContainer.border = "1px solid black";

    this.#domElement = buttonContainer;
  }
  get domElement() {
    return this.#domElement;
  }
}
