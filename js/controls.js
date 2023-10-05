export default class Controls {
  #domElement;

  constructor() {}

  initControls() {
    const buttonContainer = document.createElement("DIV");
    const rollButton = document.createElement("BUTTON");
    rollButton.textContent = "Roll the dice!";
    rollButton.id = "roll-btn"
    buttonContainer.style.height = "10em"
    buttonContainer.style.width = "10em"

    const buyButton = document.createElement('BUTTON');
    buyButton.id = "buy-btn"
    buyButton.textContent = "BUY"
    const passButton = document.createElement('BUTTON')
    passButton.id = "pass-btn"
    passButton.textContent = "PASS"


    buttonContainer.append(rollButton, buyButton, passButton);



    this.#domElement = buttonContainer;
  }
  get domElement() {
    return this.#domElement;
  }
}
