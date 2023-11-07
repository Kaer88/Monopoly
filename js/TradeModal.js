import Modal from "./Modal.js";
import getOwnedProperties from "./util/getOwnedProperties.js";
import getPropertyColor from "./util/propertyGroupColors.js";

export default class TradeModal extends Modal {
  #properties;
  #currentPlayer;
  #players;
  #selfDomRef;

  constructor(players, currentPlayerIdx) {
    super();
    this.#properties = getOwnedProperties(players);
    this.#currentPlayer = players[currentPlayerIdx];
    this.#players = players;
  }

  initComponent() {
    const container = document.createElement("DIV");
    container.style.height = "100%";
    container.style.width = "100%";
    container.style.color = "black";
    this.#selfDomRef = container;
    this.domElement.children[0].append(container);
    this.#renderPlayers();
  }

  #renderPlayers() {
    const currentPlayerContainer = document.createElement("DIV");
    const currNameP = document.createElement("P");
    const currBalanceP = document.createElement("P");
    const currentPropertiesDiv = document.createElement("DIV");
    currNameP.textContent = this.#currentPlayer.name;
    currBalanceP.textContent = this.#currentPlayer.balance;
    currentPropertiesDiv.style.display = "flex";

    this.#currentPlayer.properties.forEach((property) => {
      const propertyDiv = document.createElement("DIV");
      propertyDiv.style.width = "100px";
      propertyDiv.style.border = "1px solid black";

      const propertyName = document.createElement("P");
      const propertyColorDiv = document.createElement("DIV");
      propertyColorDiv.style.backgroundColor = getPropertyColor(
        property.propertyGroupId,
      );
      propertyColorDiv.style.height = "5px";
      propertyColorDiv.style.width = "100%";

      propertyName.textContent = property.fieldName;
      propertyDiv.append(propertyColorDiv, propertyName);
      currentPropertiesDiv.append(propertyDiv);
    });
    currentPlayerContainer.append(
      currNameP,
      currBalanceP,
      currentPropertiesDiv,
    );
    this.#selfDomRef.append(currentPlayerContainer);
  }
}
