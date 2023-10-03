export default class Player {
  #balance = 0;
  #isInJail = false;
  #currentField = 0;
  #name;
  #domElement;

  constructor(name, color) {
    this.#name = name;
    this.#createDomElement(color);
  }

  get balance() {
    return this.#balance;
  }
  set balance(newBalance) {
    this.#balance = newBalance;
  }

  get isInJail() {
    return this.#isInJail;
  }
  set isInJail(boolParameter) {
    this.#isInJail = boolParameter;
  }
  get currentField() {
    return this.#currentField;
  }
  #movePlayer(newPosition) {
    this.#currentField = newPosition;
  }

  #createDomElement(color) {
    this.#domElement = document.createElement("DIV");
    this.#domElement.style.backgroundColor = color;
    this.#domElement.style.borderRadius = "50%";
  }
}
