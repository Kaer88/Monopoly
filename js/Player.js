export default class Player {
  #balance = 1500;
  #turnsInJail = 0;
  #currentField = 0;
  #name;
  #domElement;
  #color;
  #properties = [];
  #getOutOfJailCards = 0;

  /**
   *
   * @param name {string}
   * @param color {string}
   */
  constructor(name, color) {
    this.#name = name;
    this.#color = color;
    this.#createDomElement(color);
  }

  get getOutOfJailCards() {
    return this.#getOutOfJailCards;
  }

  set getOutOfJailCards(number) {
    this.#getOutOfJailCards = number;
  }
  get name() {
    return this.#name;
  }
  get balance() {
    return this.#balance;
  }
  set balance(newBalance) {
    this.#balance = newBalance;
  }

  get turnsInJail() {
    return this.#turnsInJail;
  }
  set turnsInJail(number) {
    this.#turnsInJail = number;
  }
  get currentField() {
    return this.#currentField;
  }

  get color() {
    return this.#color;
  }

  get properties() {
    return this.#properties;
  }

  get domElement() {
    return this.#domElement;
  }
  movePlayer(newPosition) {
    this.#currentField = newPosition;
  }

  #createDomElement(color) {
    this.#domElement = document.createElement("DIV");
    this.#domElement.style.backgroundColor = color;
    this.#domElement.style.borderRadius = "50%";
    this.#domElement.style.height = "1em";
    this.#domElement.style.width = "1em";
  }

  async decide(fieldInfo, allFields, refreshScoreFn) {
    return fieldInfo.eventOnField(this, allFields, refreshScoreFn);
  }
}
