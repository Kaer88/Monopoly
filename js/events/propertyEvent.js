import ScoreBoard from "../ScoreBoard.js";

export async function propertyEvent(player, field) {
  if (field.owner === undefined) {
    return await new Promise((resolve) => {
      const buyBtn = document.querySelector("#buy-btn");
      const passBtn = document.querySelector("#pass-btn");

      ScoreBoard.instance.newMessage(
        `The property is not yet owned, ${player.name} do you want to buy it for ${field.value}$?`,
      );
      const buyFn = () => {
        if (player.balance - field.value < 0) {
          ScoreBoard.instance.newMessage(`Not enough funds!`);
          return;
        }
        field.setOwner(player);
        player.balance = player.balance - field.value;
        buyBtn.disabled = true;
        passBtn.disabled = true;
        buyBtn.removeEventListener("click", buyFn);
        ScoreBoard.instance.newMessage(
          `${field.fieldName} bought by ${player.name}`,
        );
        resolve();
      };

      const passFn = () => {
        passBtn.disabled = true;
        buyBtn.disabled = true;

        passBtn.removeEventListener("click", passFn);
        resolve();
      };
      passBtn.disabled = false;
      buyBtn.disabled = false;
      passBtn.addEventListener("click", passFn);
      buyBtn.addEventListener("click", buyFn);
    });
  }

  if (field.owner !== player) {
    ScoreBoard.instance.newMessage(
      `${field.owner.name}'s land, ${player.name} must pay rent.`,
    );
    return await new Promise((resolve) => {
      const payBtn = document.querySelector("#pay-btn");
      const payFn = () => {
        const payablePenalty = field.getPenalty();
        console.log(payablePenalty);
        player.balance -= payablePenalty;
        field.owner.balance += payablePenalty;
        payBtn.disabled = true;
        payBtn.removeEventListener("click", payFn);
        resolve();
      };
      document.querySelector("#pay-btn").disabled = false;
      document.querySelector("#pay-btn").addEventListener("click", payFn);
    });
  }
}
