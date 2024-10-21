import DOM from "./modules/DOM.js";

const playerGameboard = document.querySelector(".player-gameboard");
const computerGameboard = document.querySelector(".computer-gameboard");
const restartBtn = document.querySelector("#restart-btn");

DOM.initPlayerGameboard(playerGameboard);
DOM.initComputerGameboard(computerGameboard);

restartBtn.addEventListener("click", () => {
  DOM.restart(playerGameboard, computerGameboard);
  DOM.initPlayerGameboard(playerGameboard);
  DOM.initComputerGameboard(computerGameboard);
});
