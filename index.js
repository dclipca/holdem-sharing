import { calculateEquity } from "poker-odds";
import getRandomCard from "./src/getRandomCard";
import cards from "./src/cards";

const board = [];
const iterations = 10000;
const exhaustive = false;

for (let i = 0; i <= board.length - 1; i++) {
  delete cards[board[i]];
}

const known_card1 = getRandomCard().slice(0);
const known_card2 = getRandomCard().slice(0);
const known_card3 = getRandomCard().slice(0);
const known_card4 = getRandomCard().slice(0);
const known_card5 = getRandomCard().slice(0);
const known_card6 = getRandomCard().slice(0);

console.log("Random hands:");
console.log(
  known_card1,
  known_card2,
  known_card3,
  known_card4,
  known_card5,
  known_card6
);

const player_0_view = [
  [known_card1, known_card2],
  ["..", ".."],
  ["..", ".."],
  ["..", ".."],
  ["..", ".."],
  ["..", ".."]
];
const player_1_view = [
  ["..", ".."],
  [known_card3, known_card4],
  ["..", ".."],
  ["..", ".."],
  ["..", ".."],
  ["..", ".."]
];
const player_2_view = [
  ["..", ".."],
  ["..", ".."],
  [known_card5, known_card6],
  ["..", ".."],
  ["..", ".."],
  ["..", ".."]
];

const hands2 = [
  [known_card1, known_card2],
  [known_card3, known_card4],
  [known_card5, known_card6],
  ["..", ".."],
  ["..", ".."],
  ["..", ".."]
];

console.log(
  "Simulation 1, every player in our team plays solo (doesn't share cards):"
);
const simulation_player_0_view = calculateEquity(
  player_0_view,
  board,
  iterations,
  exhaustive
);
const simulation_player_1_view = calculateEquity(
  player_1_view,
  board,
  iterations,
  exhaustive
);
const simulation_player_2_view = calculateEquity(
  player_2_view,
  board,
  iterations,
  exhaustive
);
const player_0_solo_odds = (
  simulation_player_0_view[0].wins / simulation_player_0_view[0].count
).toFixed(2);
const player_1_solo_odds = (
  simulation_player_1_view[1].wins / simulation_player_1_view[1].count
).toFixed(2);
const player_2_solo_odds = (
  simulation_player_2_view[2].wins / simulation_player_2_view[2].count
).toFixed(2);

console.log("Simulation 2, we know the cards for Player 0, 1 and 2:");
console.log("Player 0 using shared hands:", player_0_solo_odds);
console.log("Player 1 using shared hands:", player_1_solo_odds);
console.log("Player 2 using shared hands:", player_2_solo_odds);

const simulation2 = calculateEquity(hands2, board, iterations, exhaustive);
const player_0_shared_odds = (
  simulation2[0].wins / simulation2[0].count
).toFixed(2);
const player_1_shared_odds = (
  simulation2[1].wins / simulation2[1].count
).toFixed(2);
const player_2_shared_odds = (
  simulation2[2].wins / simulation2[2].count
).toFixed(2);

console.log("Simulation 2, we know the cards for Player 0, 1 and 2:");
console.log("Player 0 using shared hands:", player_0_shared_odds);
console.log("Player 1 using shared hands:", player_1_shared_odds);
console.log("Player 2 using shared hands:", player_2_shared_odds);

/* for (let n = 0; n < hands2.length; n++) {
  console.log(
    "Player",
    n + ":",
    (simulation2[n].wins / simulation2[n].count).toFixed(2) + "%"
  );
}  */

console.log(
  "Player 0 odds difference (solo vs shared)",
  player_0_solo_odds - (simulation2[0].wins / simulation2[0].count).toFixed(2)
);
console.log(
  "Player 1 odds difference (solo vs shared)",
  player_1_solo_odds - (simulation2[1].wins / simulation2[1].count).toFixed(2)
);
console.log(
  "Player 2 odds difference (solo vs shared)",
  player_2_solo_odds - (simulation2[2].wins / simulation2[2].count).toFixed(2)
);
