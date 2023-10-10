export default class Controls {
  #domElement;

  constructor() {}

  initControls() {
    const buttonContainer = document.createElement("DIV");
    buttonContainer.style.height = "5em";
    buttonContainer.style.display = "grid";
    buttonContainer.style.width = "16vw"
    buttonContainer.style.gridTemplateColumns = "1fr 1fr 1fr 1fr"
    buttonContainer.style.gridTemplateRows = "1fr 1fr"
    buttonContainer.style.gap = "0.1em"

    const rollButton = document.createElement("BUTTON");
    rollButton.textContent = "ROLL!";
    rollButton.id = "roll-btn";
    rollButton.disabled = true;

    const buyButton = document.createElement("BUTTON");
    buyButton.id = "buy-btn";
    buyButton.textContent = "BUY!";
    buyButton.disabled = true;

    const passButton = document.createElement("BUTTON");
    passButton.id = "pass-btn";
    passButton.textContent = "PASS!";
    passButton.disabled = true;

    const payButton = document.createElement("BUTTON");
    payButton.id = "pay-btn";
    payButton.textContent = "PAY!";
    payButton.disabled = true;

    const buildButton = document.createElement("BUTTON");
    buildButton.id = "build-btn";
    buildButton.textContent = "BUILD!";
    buildButton.disabled = "true";

    const useCardButton = document.createElement("BUTTON")
    useCardButton.id = "use-card-btn";
    useCardButton.textContent = "USE CARD"
    useCardButton.disabled = "true";

    buttonContainer.append(
      rollButton,
      buyButton,
      passButton,
      payButton,
      buildButton,
      useCardButton
    );

    this.#domElement = buttonContainer;
  }
  get domElement() {
    return this.#domElement;
  }
}
