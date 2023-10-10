/**
 *
 * @param currentPlayer {Player}
 * @param diceArray {Number[]}
 * @param fields {Field[]}
 */

// egy osztály privát methodja hívogatja, nem ad vissza semmit, csak manipulálja a beadott instance-okat
// jó ötlet ez? vagy ezzel az erővel az egész #gameplayLoop() mehetne külön file-ba?

export default function setNextField( currentPlayer, diceArray, fields) {
  const currentPlayerPosition =
    currentPlayer.currentField;
  const diceValue = diceArray.reduce((acc, curr) => (acc += curr));
  let targetField;
  if (diceValue + currentPlayerPosition > fields.length - 1) {
    targetField = Math.abs(
      currentPlayerPosition + diceValue - fields.length,
    );
  } else {
    targetField = currentPlayerPosition + diceValue;
  }
  currentPlayer.movePlayer(targetField);

}
