export default class barterModal {
  #players;
  domElement;
  #currentPlayer;

  constructor(players, currentPlayer) {
    this.#currentPlayer = players[currentPlayer];
    this.#players = players;
    this.domElement = (function () {
      let container = document.createElement("DIV");
      container.id = "#sell-modal";
      container.style.position = "absolute";
      container.style.height = "100%";
      container.style.width = "100%";
      container.style.zIndex = "99";
      container.style.display = "flex";
      container.style.justifyContent = "center";
      container.style.alignItems = "center";
      container.style.backdropFilter = "blur(2px)";

      const contentDiv = document.createElement("DIV");
      contentDiv.style.height = "60vh";
      contentDiv.style.width = "50vw";
      contentDiv.style.backgroundColor = "white";

      const removeElementFn = function () {
        container.remove();
        closeBtn.removeEventListener("click", removeElementFn);
      };

      const closeBtn = document.createElement("BUTTON");
      closeBtn.textContent = "CLOSE";
      closeBtn.addEventListener("click", removeElementFn);
      contentDiv.append(closeBtn);

      container.append(contentDiv);

      return container;
    })();
  }
}
