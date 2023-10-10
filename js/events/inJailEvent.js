import ScoreBoard from "../ScoreBoard.js";

export default async function inJailEvent(player) {
  const payBtn = document.querySelector("#pay-btn");
  const useCardBtn = document.querySelector("#use-card-btn");
  const passBtn = document.querySelector("#pass-btn");
  return new Promise((resolve) => {
    const payFn = () => {
      ScoreBoard.instance.newMessage(
        `${player.name} decided to pay 50$, they are free now`,
      );
      player.turnsInJail = 0;
      player.balance -= 50;
      payBtn.disabled = true;
      passBtn.disabled = true;
      passBtn.removeEventListener("click", passFn);
      payBtn.removeEventListener("click", payFn);
      if (player.getOutOfJailCards > 0) {
        useCardBtn.disabled = true;
        useCardBtn.removeEventListener("click", useCardFn);
      }
      resolve(true);
    };
    const useCardFn = () => {
      ScoreBoard.instance.newMessage(
        `${player.name} used get out of jail card`,
      );
      player.getOutOfJailCards -= 1;
      player.turnsInJail = 0;
      useCardBtn.disabled = true;
      payBtn.disabled = true;
      passBtn.disabled = true;
      payBtn.removeEventListener("click", payFn);
      useCardBtn.removeEventListener("click", useCardFn);
      passBtn.removeEventListener("click", passFn);
      resolve(true);
    };

    const passFn = () => {
      ScoreBoard.instance.newMessage(`${player.name} decided to stay in jail`);
      passBtn.disabled = true;
      passBtn.removeEventListener("click", passFn);
      payBtn.disabled = true;
      payBtn.addEventListener("click", payFn);
      useCardBtn.disabled = true;
      if (player.getOutOfJailCards > 0) {
        useCardBtn.disabled = true;
        useCardBtn.removeEventListener("click", useCardFn);
      }

      resolve(false);
    };

    if (player.getOutOfJailCards > 0) {
      useCardBtn.disabled = false;
      useCardBtn.addEventListener("click", useCardFn);
    }
    payBtn.disabled = false;
    payBtn.addEventListener("click", payFn);
    passBtn.disabled = false;
    passBtn.addEventListener("click", passFn);
  });
}
