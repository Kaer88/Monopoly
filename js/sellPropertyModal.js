export default class sellPropertyModal {
  #players;
  #domElement;
  #currentPlayer;
  constructor(players) {
    this.#players = players;
    this.#domElement = (function () {
      let container = document.createElement("DIV");
      container.style.position = "absolute"
      container.style.height = "100%"
      container.style.width = "100%"
      container.style.zIndex = "999999"
      container.style.display ="flex";
      container.style.justifyContent = "center"
      container.style.alignItems = "center"
      container.style.backdropFilter = "blur(2px)"

      const contentDiv = document.createElement("DIV");
      contentDiv.style.height = "60vh"
      contentDiv.style.width = "50vw"
      contentDiv.style.backgroundColor = "white"

      container.append(contentDiv)

      return container;
    })();
  }
  get domElement() {
    return this.#domElement;
  }
}
