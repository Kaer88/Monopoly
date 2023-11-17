import Modal from "./Modal.js";
import getOwnedProperties from "./util/getOwnedProperties.js";
import getPropertyColor from "./util/propertyGroupColors.js";

export default class TradeModal extends Modal {
  #properties;
  #currentPlayer;
  #otherPlayers;
  #selfDomRef;

  constructor(players, currentPlayerIdx) {
    super();
    this.#properties = getOwnedProperties(players);
    this.#currentPlayer = players[currentPlayerIdx];
    this.#otherPlayers = players.filter(
      (player) => player !== this.#currentPlayer,
    );
  }

  initComponent() {
    const container = document.createElement("DIV");
    container.style.height = "100%";
    container.style.width = "100%";
    container.style.color = "black";
    container.style.display = "grid";
    container.style.gridTemplateColumns = "1fr 2fr";
    this.#selfDomRef = container;
    this.domElement.children[0].append(container);
    this.#renderPlayers();
  }

  #renderPlayers() {
    // render current player info
    const currentPlayerContainer = document.createElement("DIV");
    const currNameP = document.createElement("P");
    const currBalanceP = document.createElement("P");
    const currentPropertiesDiv = document.createElement("DIV");
    currNameP.textContent = `Current player: ${this.#currentPlayer.name}`;
    currBalanceP.textContent = this.#currentPlayer.balance;

    this.#currentPlayer.properties.forEach((property) => {
      const propertyDiv = document.createElement("DIV");
      propertyDiv.style.marginRight = "2em"
      propertyDiv.style.border = "1px solid black";

      const propertyName = document.createElement("P");
      propertyName.style.margin = "0px";
      propertyName.style.padding = "0em 0.5em";
      const propertyColorDiv = document.createElement("DIV");
      propertyColorDiv.style.backgroundColor = getPropertyColor(
        property.propertyGroupId,
      );
      propertyColorDiv.style.height = "0.3em";

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

    // render other players and their properties

    const otherPlayersContainer = document.createElement("DIV");
    otherPlayersContainer.style.display = "grid";
    otherPlayersContainer.style.gridTemplateColumns = "1fr 1fr";

   
    this.#otherPlayers.forEach((player) => {
      const playerDiv = document.createElement("DIV");
      const playerColorDiv = document.createElement("DIV");
      const playerInfos = document.createElement("DIV");
      const playerBalance = document.createElement("P");
      const playerName = document.createElement("P");
      playerBalance.textContent = player.balance;
      playerName.textContent = player.name;
      playerColorDiv.style.backgroundColor = player.color;
      playerInfos.append(playerColorDiv, playerName, playerBalance);
      playerDiv.append(playerInfos);
      otherPlayersContainer.append(playerDiv);

      const playerProperties = document.createElement("DIV");
      player.properties.forEach((property) => {
        const propertyDiv = document.createElement("DIV");
        propertyDiv.style.marginRight = "2em"
        const propertyColor = document.createElement("DIV");
        propertyColor.style.height = "5px";
        const propertyName = document.createElement("P");
        propertyName.style.margin = "0px";
        propertyName.style.padding = "0em 0.5em";
        propertyName.textContent = property.fieldName;
        propertyColor.style.backgroundColor =
          property.propertyGroupId !== undefined
            ? getPropertyColor(property.propertyGroupId)
            : "black";
        propertyDiv.append(propertyColor, propertyName);
        playerProperties.append(propertyDiv);

        // here comes the event listener that will ask for a price, and if it is agreeable to the opponent.
        // if yes, it should be added to the execution queue, handled in trade contoller
        //                      OR it should be just executed and done

        
      });
      playerDiv.append(playerProperties);
      otherPlayersContainer.append(playerDiv);
    });
    this.#selfDomRef.append(otherPlayersContainer);
  }
}
