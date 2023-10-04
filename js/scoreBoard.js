let instance;
let domElement;
let players;
//attempt at singleton class
export default class ScoreBoard {
  #messages;
  static get instance() {
    if (!instance) {
      instance = new ScoreBoard();
      (function () {
        const scoreBoardContainer = document.createElement("DIV");
        scoreBoardContainer.style.height = "40vh";
        scoreBoardContainer.style.width = "40vh";
        scoreBoardContainer.style.border = "1px solid black";

        const messageBox = document.createElement("DIV");
        const buttonContainer = document.createElement("DIV");
        buttonContainer.id = "btn-container";
        scoreBoardContainer.append(messageBox, buttonContainer);
        domElement = scoreBoardContainer;
      })();
    }
    return instance;
  }

  /**
   *
   * @param players {Player[]}
   */
  updateScore(players) {
    console.log(players);
  }

  get domElement() {
    return domElement;
  }

  /**
   *
   * @param playerState {Player[]}
   */
  set players(playerState) {
    players = playerState;
  }

  /**
   *
   * @param message {string}
   */
  newMessage(message) {
    const newP = document.createElement("P")
    newP.textContent = `${message}`
    domElement.children[0].append(newP);
  }
}
