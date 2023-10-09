import getPropertyColor from "./constants/propertyGroupColors.js";

export default class Field {
  #eventOnField; // property event, card event, jail event
  #fieldName;
  #value;
  #owner;
  #domElement;
  #propertyGroupColor;
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
   * @param propertyGroupId {Number}
   */
  constructor(
    name,
    value,
    eventOnField,
    penalties,
    buildPrice,
    propertyGroupId,
  ) {
    this.#fieldName = name;
    this.#value = value;
    this.#eventOnField = eventOnField;
    this.#penalties = penalties;
    this.#buildPrice = buildPrice;
    this.#propertyGroupId = propertyGroupId;

    const fieldDiv = document.createElement("DIV");
    fieldDiv.style.border = "1px solid black";
    fieldDiv.style.display = "flex";
    fieldDiv.style.flexDirection = "column";
    fieldDiv.style.justifyContent = "space-around";
    fieldDiv.style.alignItems = "center";
    fieldDiv.style.height = "100%";
    fieldDiv.style.width = "9rem";
    fieldDiv.style.margin = "0rem";
    fieldDiv.style.position = "relative";
    fieldDiv.style.overflow = "hidden";
    fieldDiv.style.backgroundColor = "#dce09f";
    fieldDiv.style.color = "black";

    const valueElement = document.createElement("SPAN");
    const nameElement = document.createElement("SPAN");
    const playerElement = document.createElement("DIV");
    const ownerElement = document.createElement("DIV");
    const houseContainer = document.createElement("DIV");
    const groupColorContainer = document.createElement("DIV");

    valueElement.textContent = `${value} $`;
    nameElement.textContent = `${name}`;
    nameElement.textContent = `${name}`;
    playerElement.style.display = "flex";
    ownerElement.style.height = "3em";
    ownerElement.style.width = "3em";
    ownerElement.style.position = "absolute";
    ownerElement.style.borderRadius = "50%";
    ownerElement.style.right = "-23px";
    ownerElement.style.bottom = "-23px";
    houseContainer.style.display = "absolute";
    houseContainer.style.width = "3em";
    houseContainer.style.height = "2em";
    houseContainer.style.position = "absolute";
    houseContainer.style.left = "0px";
    houseContainer.style.bottom = "0px";
    houseContainer.style.display = "flex";
    houseContainer.flexWrap = "wrap";
    houseContainer.style.gap = "0.2em";
    groupColorContainer.style.height = "1em";
    groupColorContainer.style.position = "absolute"
    groupColorContainer.style.width = "100%"
    groupColorContainer.style.top = "-12px"
    groupColorContainer.style.backgroundColor = getPropertyColor(propertyGroupId)

    fieldDiv.append(nameElement, playerElement, ownerElement, houseContainer, groupColorContainer);
    value !== 0 && fieldDiv.append(valueElement);

    this.#domElement = fieldDiv;
  }

  /**
   *
   * @param player {Player}
   */
  #setOwnerColor(player) {
    this.#domElement.children[2].style.backgroundColor = player.color;
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

  get buildPrice() {
    return this.#buildPrice;
  }
  addHouse(player) {
    if (this.#nrOfHousesBuilt > 3)
      throw new Error("Cant build any more house on this field!");
    this.#nrOfHousesBuilt += 1;
    const houseDom = document.createElement("DIV");
    houseDom.style.backgroundColor = player.color;
    houseDom.style.height = "1em";
    houseDom.style.width = "0.5em";
    this.#domElement.children[3].append(houseDom);
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
    return this.#penalties[this.#nrOfHousesBuilt];
  }
  async eventOnField(player) {
    return this.#eventOnField(player, this);
  }

  get domElement() {
    return this.#domElement;
  }
}
