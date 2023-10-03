export default class Player {
  #balance = 0;
  #isInJail = false;
  #currentField = 0;
  #name;
  #domElement;

  /**
   *
   * @param name {string}
   * @param color {string}
   */
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

  get domElement() {
    return this.#domElement;
  }
  #movePlayer(newPosition) {
    this.#currentField = newPosition;
  }

  #createDomElement(color) {
    this.#domElement = document.createElement("DIV");
    this.#domElement.style.backgroundColor = color;
    this.#domElement.style.borderRadius = "50%";
    this.#domElement.style.height = '1em'
    this.#domElement.style.width = '1em'
  }
}
