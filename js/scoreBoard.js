let instance;
let domElement;
//attempt at singleton class
export default class ScoreBoard {
  static get instance() {
    if (!instance) {
      instance = new ScoreBoard();
      (function () {
        const scoreBoardContainer = document.createElement("DIV");
        scoreBoardContainer.style.height = "60vh";
        scoreBoardContainer.style.width = "40vh";
        scoreBoardContainer.style.border = "1px solid black";
        scoreBoardContainer.style.marginTop = "5vh"

        const messageBox = document.createElement("DIV");
        messageBox.style.overflowY = "scroll";
        messageBox.style.height = "30vh"
        messageBox.style.borderBottom = "1px solid black"

        const playerInfo = document.createElement("DIV");
        playerInfo.style.height = "15vh";
        playerInfo.style.display = "grid";
        playerInfo.style.grid = "1fr 1fr 1fr";
        playerInfo.style.borderBottom = "1px solid black"

        const buttonContainer = document.createElement("DIV");

        buttonContainer.id = "btn-container";
        scoreBoardContainer.append(playerInfo, messageBox, buttonContainer);
        domElement = scoreBoardContainer;
      })();
    }
    return instance;
  }
  get domElement() {
    return domElement;
  }

  /**
   *
   * @param playerState {Player[]}
   */
  updatePlayerState(playerState) {
    const targetElement = domElement.children[0];
    playerState.forEach((playerData) => {
      const playerContainer = document.createElement("DIV");
      playerContainer.style.display = "flex"
      playerContainer.style.justifyContent = "space-around"
      const nameSpan = document.createElement("SPAN");
      const balanceSpan = document.createElement("SPAN");
      const isInJail = document.createElement("SPAN")

      nameSpan.textContent = playerData.name;
      balanceSpan.textContent = `${playerData.balance} $`
      isInJail.textContent = `${playerData.isInJail ? "in jail" : "free"}`;

      playerContainer.append(nameSpan, balanceSpan, isInJail)
      targetElement.append(playerContainer)

    });
  }

  /**
   *
   * @param message {string}
   */
  newMessage(message) {
    const newP = document.createElement("P");
    newP.textContent = `${message}`;
    domElement.children[1].append(newP);
  }
}
