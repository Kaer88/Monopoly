export default function diceRoll() {
  const dice1 = Number(prompt("lépésszám:"));
  return [dice1, 0];

  //return [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
}
