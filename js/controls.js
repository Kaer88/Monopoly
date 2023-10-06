export default class Controls {
  #domElement;

  constructor() {}

  initControls() {
    const buttonContainer = document.createElement("DIV");
    buttonContainer.style.height = "5em";
    buttonContainer.style.display = "flex"

    const rollButton = document.createElement("BUTTON");
    rollButton.textContent = "ROLL!";
    rollButton.id = "roll-btn";
    rollButton.disabled = true;

    const buyButton = document.createElement("BUTTON");
    buyButton.id = "buy-btn";
    buyButton.textContent = "BUY";
    buyButton.disabled = true;

    const passButton = document.createElement("BUTTON");
    passButton.id = "pass-btn";
    passButton.textContent = "PASS";
    passButton.disabled = true;

    const payButton = document.createElement("BUTTON");
    payButton.id = "pay-btn";
    payButton.textContent = "PAY!";
    payButton.disabled = true;

    buttonContainer.append(rollButton, buyButton, passButton, payButton);

    this.#domElement = buttonContainer;
  }
  get domElement() {
    return this.#domElement;
  }
}
