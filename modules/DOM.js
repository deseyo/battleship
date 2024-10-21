import Player from "./player.js";

export default class DOM {
  static playerGameboard = document.querySelector(".player-gameboard");
  static computerGameboard = document.querySelector(".computer-gameboard");
  static orientationSelect = document.querySelector("#orientation-select");
  static status = document.querySelector(".status");
  static player = new Player();
  static computer = new Player();
  static gameOver = true;

  static playerGameboardContainer = [[], [], [], [], [], [], [], [], [], []];

  static computerGameboardContainer = [[], [], [], [], [], [], [], [], [], []];

  static initPlayerGameboard() {
    for (let r = 0; r < 10; r++) {
      const row = document.createElement("div");
      row.className = "row";
      for (let f = 0; f < 10; f++) {
        const field = document.createElement("div");
        field.className = "field";
        field.index = f;
        field.parentIndex = r;
        field.addEventListener("click", () => {
          let shipsCount = DOM.player.gameboard.getShipsCount();
          if (
            shipsCount === 0 ||
            shipsCount === 1 ||
            shipsCount === 2 ||
            shipsCount === 3 ||
            shipsCount === 4
          ) {
            let shipLength;
            if (shipsCount === 0) shipLength = 2;
            else if (shipsCount === 1) shipLength = 3;
            else if (shipsCount === 2) shipLength = 3;
            else if (shipsCount === 3) shipLength = 4;
            else if (shipsCount === 4) (shipLength = 5), (DOM.gameOver = false);
            if (DOM.orientationSelect.value === "horizontally") {
              if (
                DOM.player.gameboard.placeShipHorizontally(
                  field.parentIndex,
                  field.index,
                ) === true
              ) {
                field.classList.add("placed-ship");
                for (let i = 0; i < shipLength; i++) {
                  DOM.playerGameboardContainer[r][
                    i + field.index
                  ].classList.add("placed-ship");
                }
              }
            } else if (DOM.rientationSelect.value === "vertically") {
              if (
                DOM.player.gameboard.placeShipVertically(
                  field.parentIndex,
                  field.parentIndex + shipLength,
                  field.index,
                ) === true
              ) {
                field.classList.add("placed-ship");
                for (let i = 0; i < shipLength; i++) {
                  DOM.playerGameboardContainer[field.parentIndex + i][
                    field.index
                  ].classList.add("placed-ship");
                }
              }
            }
          }
        });
        row.appendChild(field);
        DOM.playerGameboardContainer[r].push(field);
      }
      DOM.playerGameboard.appendChild(row);
    }
  }

  static initComputerGameboard() {
    for (let r = 0; r < 10; r++) {
      const row = document.createElement("div");
      row.className = "row";
      for (let f = 0; f < 10; f++) {
        const field = document.createElement("div");
        field.className = "field";
        field.index = f;
        field.parentIndex = r;
        field.clicked = false;
        field.addEventListener("click", () => {
          if (field.clicked === false) {
            if (DOM.gameOver === false) {
              if (
                DOM.computer.gameboard.board[field.parentIndex][field.index] !==
                0
              ) {
                field.classList.add("hit-ship");
                DOM.computer.gameboard.receiveAttack(
                  field.parentIndex,
                  field.index,
                );
              } else {
                field.classList.add("missed-field");
              }
              if (DOM.computer.gameboard.getSunkShips().length === 5) {
                DOM.gameOver = true;
              } else DOM.randomComputerAttack();
              field.clicked = true;
            }
          }
        });
        row.appendChild(field);
        DOM.computerGameboardContainer[r].push(field);
      }
      DOM.computerGameboard.appendChild(row);
    }

    while (DOM.computer.gameboard.getShipsCount() !== 5) {
      let randomRow = Math.floor(Math.random() * 9);
      let randomField = Math.floor(Math.random() * 9);
      let randomOrientation = ["horizontally", "vertically"];
      if (Math.floor(Math.random() * 2) === 0)
        randomOrientation = randomOrientation[0];
      else if (Math.floor(Math.random() * 2) === 1)
        randomOrientation = randomOrientation[1];
      addRandomShip(
        randomRow,
        randomField,
        DOM.computer.gameboard.getShipsCount(),
        randomOrientation,
      );
    }

    function addRandomShip(row, field, shipsCount, orientation) {
      if (
        shipsCount === 0 ||
        shipsCount === 1 ||
        shipsCount === 2 ||
        shipsCount === 3 ||
        shipsCount === 4
      ) {
        let shipLength;
        if (shipsCount === 0) shipLength = 2;
        else if (shipsCount === 1) shipLength = 3;
        else if (shipsCount === 2) shipLength = 3;
        else if (shipsCount === 3) shipLength = 4;
        else if (shipsCount === 4) shipLength = 5;
        if (orientation === "horizontally") {
          DOM.computer.gameboard.placeShipHorizontally(row, field);
        } else if (orientation === "vertically") {
          DOM.computer.gameboard.placeShipVertically(
            row,
            row + shipLength,
            field,
          );
        }
      }
    }
  }

  static randomComputerAttack() {
    let randomRow = Math.floor(Math.random() * 9);
    let randomField = Math.floor(Math.random() * 9);
    if (DOM.player.gameboard.board[randomRow][randomField] !== 0) {
      if (DOM.player.gameboard.receiveAttack(randomRow, randomField))
        DOM.playerGameboardContainer[randomRow][randomField].classList.add(
          "hit-ship",
        );
      DOM.status.textContent = `Enemy has attacked row ${randomRow} field ${randomField} and hit one of our ship!`;
    } else {
      DOM.playerGameboardContainer[randomRow][randomField].classList.add(
        "missed-field",
      );
      DOM.status.textContent = `Enemy has attacked row ${randomRow} field ${randomField} and missed`;
    }
  }

  static restart() {
    DOM.playerGameboard.innerHTML = "";
    DOM.computerGameboard.innerHTML = "";
    DOM.status.textContent = "";
    DOM.player = new Player();
    DOM.computer = new Player();
    DOM.gameOver = true;
    DOM.playerGameboardContainer = [[], [], [], [], [], [], [], [], [], []];
    DOM.computerGameboardContainer = [[], [], [], [], [], [], [], [], [], []];
  }
}
