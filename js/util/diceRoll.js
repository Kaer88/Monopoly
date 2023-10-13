export default function diceRoll() {
  const dice1 = Number(prompt("egyes dobás:"));
  const dice2 = Number(prompt("kettes dobás:"));
  return [dice1, dice2];

  //return [Math.floor(Math.random() * 6 + 1), Math.floor(Math.random() * 6 + 1)];
}
