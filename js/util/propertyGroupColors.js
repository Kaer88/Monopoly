
const colorsById = {
  1: "#805ce6",
  2: "blue",
  3: "pink",
  4: "orange",
  5: "red",
  6: "yellow",
  7: "green",
  8: "#290982"

}
export default function getPropertyColor(fieldId) {
  return colorsById[fieldId];
}

