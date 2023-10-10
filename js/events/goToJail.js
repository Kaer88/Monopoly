import ScoreBoard from "../ScoreBoard.js";

/**
 *
 * @param player {Player}
 */
export default async function goToJail(player) {
  return new Promise((resolve) => {
    player.turnsInJail = 3;
    player.movePlayer(10);
    ScoreBoard.instance.newMessage(`${player.name} is sent to Jail..`);
    resolve();
  });
}
