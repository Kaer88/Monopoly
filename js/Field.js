export default class Field {
  #eventOnField; // property event, card event, jail event
  #fieldName;
  #value;
  #owner;
  #domElement;
  #color;
  #propertyGroupId;
  #nrOfHousesBuilt = 0;
  #penalties;
  #buildPrice;

  /**
   * @param name {string}
   * @param value {number}
   * @param eventOnField {function}
   * @param penalties {Number[]}
   * @param buildPrice {Number}
   *
   */
  constructor(name, value, eventOnField, penalties, buildPrice) {
    this.#fieldName = name;
    this.#value = value;
    this.#eventOnField = eventOnField;
    this.#penalties = penalties;
    this.#buildPrice = buildPrice;

    const fieldDiv = document.createElement("DIV");
    fieldDiv.style.border = "1px solid black";
    fieldDiv.style.display = "flex";
    fieldDiv.style.flexDirection = "column";
    fieldDiv.style.justifyContent = "space-around";
    fieldDiv.style.alignItems = "center";
    fieldDiv.style.height = "7rem";
    fieldDiv.style.width = "5rem";
    fieldDiv.style.margin = "0rem";

    const valueElement = document.createElement("SPAN");
    const nameElement = document.createElement("SPAN");
    const playerElement = document.createElement("DIV");
    const ownerElement = document.createElement("DIV");

    valueElement.textContent = `${value} $`;
    nameElement.textContent = `${name}`;
    playerElement.style.display = "flex";
    ownerElement.style.height = "1em";
    ownerElement.style.width = "100%";

    fieldDiv.append(nameElement, playerElement, valueElement, ownerElement);
    this.#domElement = fieldDiv;
  }

  /**
   *
   * @param player {Player}
   */
  #setOwnerColor(player) {
    console.log(this.#domElement.children[3]);
    console.log(player.color);
    this.#domElement.children[3].style.backgroundColor = player.color;
  }

  get fieldName() {
    return this.#fieldName;
  }

  get value() {
    return this.#value;
  }

  get owner() {
    return this.#owner;
  }

  /**
   *
   * @param newOwner {Player}
   */
  setOwner(newOwner) {
    this.#owner = newOwner;
    this.#setOwnerColor(newOwner);
  }

  getPenalty() {
    return this.#penalties[this.#nrOfHousesBuilt]
  }
  async eventOnField(player) {
    return this.#eventOnField(player, this);
  }

  get domElement() {
    return this.#domElement;
  }
}
