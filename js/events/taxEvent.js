/**
 *
 * @param player {Player}
 * @param fieldInfo {Field}
 * @param allFields {Field[]}
 * @param refreshScoreFn {function}
 */
import ScoreBoard from "../ScoreBoard.js";

export default function taxEvent(player, fieldInfo, allFields, refreshScoreFn) {
  return new Promise((resolve) => {
    const payBtn = document.querySelector("#pay-btn");
    ScoreBoard.instance.newMessage("Tax must be paid!");
    const payFn = () => {
      player.balance -= fieldInfo.value;
      payBtn.disabled = true;
      payBtn.removeEventListener("click", payFn);
      resolve();
    };
    payBtn.disabled = false;
    payBtn.addEventListener("click", payFn);
  });
}
