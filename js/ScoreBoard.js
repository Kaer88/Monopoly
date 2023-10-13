let instance;
let domElement;
let players;
//attempt at singleton class
export default class ScoreBoard {
  static get instance() {
    if (!instance) {
      instance = new ScoreBoard();
      // this might need some refactoring
      (function () {
        const scoreBoardContainer = document.createElement("DIV");
        scoreBoardContainer.style.height = "60vh";
        scoreBoardContainer.style.width = "40vh";
        scoreBoardContainer.style.border = "1px solid black";

        const messageBox = document.createElement("DIV");
        messageBox.style.overflowY = "scroll";
        messageBox.style.height = "44.7vh";
        messageBox.style.paddingLeft = "0.5em";

        const playerInfo = document.createElement("DIV");
        playerInfo.style.height = "15vh";
        playerInfo.style.display = "grid";
        playerInfo.style.grid = "1fr 1fr 1fr";
        playerInfo.style.borderBottom = "1px solid black";

        scoreBoardContainer.append(playerInfo, messageBox);
        domElement = scoreBoardContainer;
      })();
    }
    console.log(players)
    return instance;
  }
  get domElement() {
    return domElement;
  }

  set players(playerArray) {
    console.log(playerArray)
    players = playerArray;
    domElement.children[1].textContent = playerArray.reduce((acc, curr) => acc += acc + " " + curr.name, "")
  }
  /**
   *
   * @param playerState {Player[]}
   * @param currentPlayerIndex{number}
   */
  updatePlayerState(playerState, currentPlayerIndex) {
    const targetElement = domElement.children[0];
    // remove outdated elements
    targetElement.innerHTML = "";
    playerState.forEach((playerData, idx) => {
      const playerContainer = document.createElement("DIV");
      playerContainer.style.display = "grid";
      playerContainer.style.gridTemplateColumns = "1fr 1fr 1fr";
      playerContainer.style.alignItems = "center";
      playerContainer.style.paddingLeft = "0.5em";
      playerContainer.style.border =
        idx === currentPlayerIndex ? `3px solid ${playerData.color}` : "";
      const nameSpan = document.createElement("SPAN");
      const balanceSpan = document.createElement("SPAN");
      const isInJail = document.createElement("SPAN");

      nameSpan.textContent = playerData.name;
      balanceSpan.textContent = `${playerData.balance} $`;
      isInJail.textContent = `${
        playerData.turnsInJail > 0
          ? `in jail (${playerData.turnsInJail})`
          : "free"
      }`;

      playerContainer.append(nameSpan, balanceSpan, isInJail);
      targetElement.append(playerContainer);
    });
  }

  /**
   *
   * @param message {string}
   */
  newMessage(message) {
    const newP = document.createElement("P");
    newP.style.listStyle = "disc";

    newP.textContent = `${message}`;
    domElement.children[1].prepend(newP);
  }
}
