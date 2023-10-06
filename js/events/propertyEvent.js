import ScoreBoard from "../ScoreBoard.js";

export async function propertyEvent(player, field) {
  if (field.owner === undefined) {
    return new Promise((resolve) => {
      const buyBtn = document.querySelector("#buy-btn");
      const passBtn = document.querySelector("#pass-btn");

      ScoreBoard.instance.newMessage(
        `The property is not yet owned, ${player.name} do you want to buy it for ${field.value}$?`,
      );
      const buyFn = () => {
        if (player.balance - field.value < 0) return ScoreBoard.instance.newMessage(`Not enough funds!`);
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
    const payablePenalty = field.getPenalty();
    ScoreBoard.instance.newMessage(
      `${field.owner.name}'s land, ${player.name} must pay rent: ${payablePenalty}$.`,
    );

    return new Promise((resolve) => {
      const payBtn = document.querySelector("#pay-btn");
      const payFn = () => {
        player.balance -= payablePenalty;
        field.owner.balance += payablePenalty;
        payBtn.disabled = true;
        payBtn.removeEventListener("click", payFn);
        resolve();
      };
      payBtn.disabled = false;
      payBtn.addEventListener("click", payFn);
    });
  }
}
