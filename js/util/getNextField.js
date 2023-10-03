/**
 *
 * @param players {Player}
 * @param currentPlayer {number}
 * @param diceArray {Number[]}
 * @param fields {Field[]}
 */

// egy osztály privát methodja hívogatja, nem ad vissza semmit, csak manipulálja a beadott instance-okat
// jó ötlet ez?

export default function getNextField(players, currentPlayer, diceArray, fields) {
  const currentPlayerPosition =
    players[currentPlayer].currentField;
  const diceValue = diceArray.reduce((acc, curr) => (acc += curr));
  let targetField;
  // ellenőrizni, hogy az utolsó mezőre érkezve is jól működik-e
  if (diceValue + currentPlayerPosition > 36) {
    targetField = Math.abs(
      currentPlayerPosition + diceValue - fields.length,
    );
  } else {
    targetField = currentPlayerPosition + diceValue;
  }
  players[currentPlayer].movePlayer(targetField);

}
