import ScoreBoard from "./scoreBoard.js";

export async function propertyEvent(player, field) {
  if (field.owner === undefined) {
    await new Promise((resolve) => {
      ScoreBoard.instance.newMessage(
        `The property is not yet owned, ${player.name} do you want to buy it for ${field.value}$?`,
      );
      const buyFn = () => {
        if (player.balance - field.value < 0) {
          ScoreBoard.instance.newMessage(
            `Not enough funds!`,
          );
          return
        }
        field.setOwner(player);
        player.balance = player.balance - field.value;
        document.querySelector("#buy-btn").removeEventListener("click", buyFn);
        ScoreBoard.instance.newMessage(`${field.fieldName} bought by ${player.name}`)
        resolve();
      };

      const passFn = () => {
        document
          .querySelector("#pass-btn")
          .removeEventListener("click", passFn);
        resolve();
      };

      document.querySelector("#pass-btn").addEventListener("click", passFn);
      document.querySelector("#buy-btn").addEventListener("click", buyFn);
    });
  }

}
