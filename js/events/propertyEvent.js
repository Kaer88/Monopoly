import ScoreBoard from "../ScoreBoard.js";

export async function propertyEvent(player, field, allFields, refreshScoreFn) {
  if (field.owner === undefined) {
    return new Promise((resolve) => {
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
        buyBtn.removeEventListener("click", buyFn);

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

  if (
    field.owner === player &&
    allFields
      .filter((property) => field.propertyGroupId === property.propertyGroupId)
      .every((property) => property.owner === player)
  ) {
    const buildBtn = document.querySelector("#build-btn");
    const passBtn = document.querySelector("#pass-btn");

    return new Promise((resolve) => {
      ScoreBoard.instance.newMessage(
        `Property of ${player.name}, house can be built for ${field.buildPrice}`,
      );
      const buildFn = () => {
        if (player.balance < field.buildPrice) {
          ScoreBoard.instance.newMessage("Not enough funds!");
          return;
        }

        try {
          field.addHouse(player);
          player.balance -= field.buildPrice;
          refreshScoreFn();
        } catch (err) {
          ScoreBoard.instance.newMessage(err);
        }
        ScoreBoard.instance.newMessage(
          `${player.name} built a house on ${field.fieldName}`,
        );
      };
      const passFn = () => {
        passBtn.disabled = true;
        buildBtn.disabled = true;
        passBtn.removeEventListener("click", passFn);
        buildBtn.removeEventListener("click", buildFn);
        resolve();
      };

      buildBtn.disabled = false;
      passBtn.disabled = false;

      buildBtn.addEventListener("click", buildFn);
      passBtn.addEventListener("click", passFn);
    });
  }
}
