export default class Player {
  #balance = 0;
  #isInJail = false;
  #currentField = 0;
  #name;

  constructor(name) {
    this.#name = name;
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
  set currentField(newPosition) {
    this.#currentField = newPosition;
  }
}
