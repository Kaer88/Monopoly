import diceRoll from "./util/diceRoll.js";

export default class Controls {
  #domElement;

  constructor() {}

  initControls() {
    const buttonContainer = document.createElement("DIV");
    const rollButton = document.createElement("BUTTON");
    rollButton.textContent = 'Roll the dice!'
    buttonContainer.append(rollButton);

    buttonContainer.style.position = "absolute";
    buttonContainer.style.right = "0px";
    buttonContainer.style.top = "0px";

    buttonContainer.height = "10em";
    buttonContainer.width = "10em";
    buttonContainer.border = "1px solid black";

    rollButton.addEventListener('click',() => {
      return diceRoll();
    })
    document.body.append(buttonContainer);
  }
}
