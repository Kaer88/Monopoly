/**
 * property eventFn
 * tax eventFn
 * 1-es kártya eventFn
 * 2-es kártya eventFn
 * go to jail eventFn
 * no eventFn
 *  https://en.wikibooks.org/wiki/Monopoly/Properties_reference
 *
 */
import {propertyEvent} from "../events/propertyEvent.js";

export const fieldTemplate = [
  {
    name: "GO",
    value: 0,
    eventFn: (targetPlayer) => {},
    penalties: [],
    buildPrice: 0,
  },
  {
    name: "Old Kent Road",
    value: 60,
    eventFn: propertyEvent,
    penalties: [2, 10, 20, 90, 160, 250],
    buildPrice: 50,
  },
  {
    name: "Community chest",
    value: 0,
    eventFn: (targetPlayer) => {},
  },
  {
    name: "Whitechapel Road",
    value: 60,
    eventFn: propertyEvent,
    penalties: [2, 10, 20, 90, 160, 250 ],
    buildPrice: 50,
  },
  {
    name: "Income tax",
    value: 200,
    eventFn: (targetPlayer) => {},
  },
  {
    name: "Kings Cross Station",
    value: 200,
    eventFn: propertyEvent,
    penalties: [25, 25, 25, 25, 25, 25],
    buildPrice: 50,
  },
  {
    name: "The Angel Islington",
    value: 100,
    eventFn: propertyEvent,
    penalties: [6, 30, 90, 270, 400, 500],
    buildPrice: 50,
  },
  {
    name: "Chance",
    value: 0,
    eventFn: (targetPlayer) => {},
  },
  {
    name: "Euston Road",
    value: 100,
    eventFn: propertyEvent,
    penalties: [6, 30, 90, 270, 400, 500],
    buildPrice: 50,
  },
  {
    name: "Whitechapel road",
    value: 120,
    eventFn: propertyEvent,
    penalties: [8, 40, 100, 300, 450, 600],
    buildPrice: 50,
  },
  {
    name: "Jail",
    value: 0,
    eventFn: (targetPlayer) => {},
  },
  {
    name: "Pall Mall",
    value: 140,
    eventFn: propertyEvent,
    penalties: [10, 50, 150, 450, 625, 750],
    buildPrice: 100,
  },
  {
    name: "Electric company",
    value: 150,
    eventFn: propertyEvent,
  },
  {
    name: "Whitehall",
    value: 140,
    eventFn: propertyEvent,
    penalties: [10, 50, 150, 450, 625, 750],
    buildPrice: 100,
  },
  {
    name: "Northumberland Ave",
    value: 160,
    eventFn: propertyEvent,
    penalties: [12, 60, 180, 500, 700, 900],
    buildPrice: 100,
  },
  {
    name: "Marylebone Station",
    value: 200,
    eventFn: propertyEvent,
    penalties: [25, 25, 25, 25, 25, 25],

  },
  {
    name: "Bow Street",
    value: 180,
    eventFn: propertyEvent,
    penalties: [14, 70, 200, 550, 750, 950],
    buildPrice: 100,
  },
  {
    name: "Community chest",
    value: 0,
    eventFn: (targetPlayer) => {},
  },
  {
    name: "Marlborough St.",
    value: 180,
    eventFn: propertyEvent,
    penalties: [14, 70, 200, 550, 750, 950],
    buildPrice: 100,
  },
  {
    name: "Vine Street",
    value: 200,
    eventFn: propertyEvent,
    penalties: [16, 80, 220, 600, 800, 1000],
    buildPrice: 100,
  },
  {
    name: "Parking lot",
    value: 0,
    eventFn: () => {},
  },
  {
    name: "Strand",
    value: 220,
    eventFn: propertyEvent,
    penalties: [18, 90, 250, 700, 875, 1050],
    buildPrice: 150,
  },
  {
    name: "Chance",
    value: 0,
    eventFn: () => {},
  },
  {
    name: "Fleet Street",
    value: 220,
    eventFn: propertyEvent,
    penalties: [18, 90, 250, 700, 875, 1050],
    buildPrice: 150,
  },
  {
    name: "Trafalgar Sq",
    value: 240,
    eventFn: propertyEvent,
    penalties: [20, 100, 300, 750, 925, 1100],
    buildPrice: 150,
  },
  {
    name: "Fenchurch Station",
    value: 200,
    eventFn: propertyEvent,
    penalties: [25, 25, 25, 25, 25, 25],
  },
  {
    name: "Leicester Square",
    value: 260,
    eventFn: propertyEvent,
    penalties: [22, 110, 330, 800, 975, 1150],
    buildPrice: 150,
  },
  {
    name: "Coventry Street",
    value: 260,
    eventFn: propertyEvent,
    penalties: [22, 110, 330, 800, 975, 1150],
    buildPrice: 150,
  },
  {
    name: "Waterworks",
    value: 150,
    eventFn: propertyEvent,
  },
  {
    name: "Piccadilly",
    value: 280,
    eventFn: propertyEvent,
    penalties: [24, 120, 360, 850, 1025, 1200],
    buildPrice: 150,
  },
  {
    name: "Go to Jail",
    value: 0,
    eventFn: (targetPlayer) => {},
  },
  {
    name: "Regent Street",
    value: 300,
    eventFn: propertyEvent,
    penalties: [26, 130, 390, 900, 1100, 1275],
    buildPrice: 150,
  },
  {
    name: "Oxford Street",
    value: 300,
    eventFn: propertyEvent,
    penalties: [26, 130, 390, 900, 1100, 1275],
    buildPrice: 150,
  },
  {
    name: "Community chest",
    value: 0,
    eventFn: (targetPlayer) => {},
  },
  {
    name: "Bond Street",
    value: 320,
    eventFn: propertyEvent,
    penalties: [28, 150, 450, 1000, 1200, 1400],
    buildPrice: 150,
  },
  {
    name: "Liverpool station",
    value: 200,
    eventFn: propertyEvent,
    penalties: [25, 25, 25, 25, 25, 25],

  },
  {
    name: "Chance",
    value: 0,
    eventFn: (targetPlayer) => {},
  },
  {
    name: "Park Lane",
    value: 350,
    eventFn: propertyEvent,
    penalties: [35, 175, 500, 1100, 1300, 1500],
    buildPrice: 150,
  },
  {
    name: "Super tax",
    value: 200,
    eventFn: (targetPlayer) => {},
  },
  {
    name: "Mayfair",
    value: 400,
    eventFn: propertyEvent,
    penalties: [50, 200, 600, 1400, 1700, 2000],
    buildPrice: 150,
  },
];
