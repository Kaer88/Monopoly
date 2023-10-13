import ScoreBoard from "../ScoreBoard.js";

/**
 *
 * @param player {Player}
 * @param field {Field}
 * @param allFields {Field[]}
 * @param refreshScoreFn {function}
 * @param diceValue {Number[]}
 * @returns {Promise}
 */
export async function propertyEvent(
  player,
  field,
  allFields,
  refreshScoreFn,
  diceValue,
) {
  if (field.owner === null) {
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
        player.properties.push(field);
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
    let payablePenalty;

    const payPromise = () => {
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
    };

    if (!field.utilityFlag && !field.stationFlag) {
      payablePenalty = field.getPenalty();
      ScoreBoard.instance.newMessage(
        `${field.owner.name}'s land, ${player.name} must pay rent: ${payablePenalty}$.`,
      );
      await payPromise();
    }

    if (field.utilityFlag) {
      // itt nem stimmel a fizetendő
      // a szabály: ha egy van, akkor 4szerese a kockának, ha 2, akkor 10szerese
      payablePenalty =
        allFields.filter(
          (otherField) =>
            otherField.owner === field.owner && otherField.utilityFlag === true,
        ).length * diceValue.reduce((acc, curr) => (acc += curr), 0);
      ScoreBoard.instance.newMessage(
        `${field.owner.name}'s land, ${player.name} must pay rent: ${payablePenalty}$.`,
      );
      console.log(payablePenalty);
      console.log("this is a utility field");
      await payPromise();
    }
    //
    if (field.stationFlag) {
      console.log(
        allFields.filter(
          (otherField) =>
            otherField.owner === field.owner && otherField.stationFlag === true,
        ),
      );
      payablePenalty =
        field.penalties[
          allFields.filter(
            (otherField) =>
              otherField.owner === field.owner &&
              otherField.stationFlag === true,
          ).length - 1
        ];
      ScoreBoard.instance.newMessage(
        `${field.owner.name}'s land, ${player.name} must pay rent: ${payablePenalty}$.`,
      );
      console.log("this is a station field");
      await payPromise();
    }
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
        field.addHouse(player);
        player.balance -= field.buildPrice;
        player.properties.push(field);
        refreshScoreFn();
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
