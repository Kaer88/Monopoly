export default class Field {
  #eventOnField; // property event, card event, jail event
  #fieldName;
  #value;
  #owner = null;
  #domElement;
  #color;
  #nrOfHouses;
  #basePenalty;

  constructor(name, value, eventOnField) {
    this.#fieldName = name;
    this.#value = value;
    this.#eventOnField = eventOnField;
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




}
