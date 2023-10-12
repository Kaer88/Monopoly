import ScoreBoard from "../ScoreBoard";

/**
 *
 * @param player {Player}
 * @param field {Field}
 * @param allFields {Field[]}
 * @param refreshScoreFn {function}
 * @returns {Promise}
 */
export default function utilityPropertyEvent(
  player,
  field,
  allFields,
  refreshScoreFn,
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

  if (field.owner === player) {
  }

  if (field.owner !== player) {
  }
}
