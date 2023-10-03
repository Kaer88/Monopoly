export default class Field {
  #eventOnField; // property event, card event, jail event
  #fieldName;
  #value;
  #owner = null;
  #domElement;
  #color;
  #nrOfHouses;
  #basePenalty;

  /**
   *
   * @param name {string}
   * @param value {number}
   * @param eventOnField {function}
   */
  constructor(name, value, eventOnField) {
    this.#fieldName = name;
    this.#value = value;
    this.#eventOnField = eventOnField;

    const fieldDiv = document.createElement("DIV");
    fieldDiv.style.border = "1px solid black";
    fieldDiv.style.display = "flex";
    fieldDiv.style.flexDirection = "column";
    fieldDiv.style.justifyContent = "space-around";
    fieldDiv.style.alignItems = "center";
    fieldDiv.style.height = "7rem";
    fieldDiv.style.width = "5rem";
    fieldDiv.style.margin = "0rem"

    const valueElement = document.createElement("SPAN");
    const nameElement = document.createElement("SPAN");
    const playerElement = document.createElement("DIV");
    valueElement.textContent = `${value} $`;
    nameElement.textContent = `${name}`;
    nameElement.style.display = "flex";

    fieldDiv.append(nameElement, playerElement, valueElement);
    this.#domElement = fieldDiv;
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

  set owner(newOwner) {
    this.#owner = newOwner;
  }

  get domElement() {
    return this.#domElement;
  }
}
