import Ship from "./ship.js";
export default class Gameboard {
  #twoLengthShip = new Ship(2, 0);
  #threeLengthShipOne = new Ship(3, 1);
  #threeLengthShipTwo = new Ship(3, 2);
  #fourLengthShip = new Ship(4, 3);
  #fiveLengthShip = new Ship(5, 4);
  #placedShipsCount = 0;
  #sunkShips = [];
  #gameOver = false;

  constructor() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  placeShipHorizontally(row, column) {
    if (this.#placedShipsCount < 5 && this.board[row][column] === 0) {
      if (
        this.#placedShipsCount === 0 &&
        !!fillWithShip(structuredClone(this.board), row, column, 2, -1)
      ) {
        fillWithShip(this.board, row, column, 2, -1);
        this.#placedShipsCount++;
        return true;
      } else if (
        this.#placedShipsCount === 1 &&
        !!fillWithShip(structuredClone(this.board), row, column, 3, -2)
      ) {
        fillWithShip(this.board, row, column, 3, -2);
        this.#placedShipsCount++;
        return true;
      } else if (
        this.#placedShipsCount === 2 &&
        !!fillWithShip(structuredClone(this.board), row, column, 3, -3)
      ) {
        fillWithShip(this.board, row, column, 3, -3);
        this.#placedShipsCount++;
        return true;
      } else if (
        this.#placedShipsCount === 3 &&
        !!fillWithShip(structuredClone(this.board), row, column, 4, -4)
      ) {
        fillWithShip(this.board, row, column, 4, -4);
        this.#placedShipsCount++;
        return true;
      } else if (
        this.#placedShipsCount === 4 &&
        !!fillWithShip(structuredClone(this.board), row, column, 5, -5)
      ) {
        fillWithShip(this.board, row, column, 5, -5);
        this.#placedShipsCount++;
        return true;
      }
    }

    function fillWithShip(obj, row, column, length, num) {
      let sliced = obj[row].slice(column, column + length);
      if (
        sliced.length < length ||
        sliced.filter((field) => field !== 0).length !== 0
      )
        return false;
      for (let i = column; i < column + length; i++) {
        obj[row][i] = num;
      }
      return true;
    }
  }

  placeShipVertically(startRow, endRow, column) {
    if (
      this.#placedShipsCount < 5 &&
      startRow < endRow &&
      this.board.slice(startRow, endRow).filter((row) => row[column] !== 0)
        .length === 0
    ) {
      if (
        this.#placedShipsCount === 0 &&
        !!fillWithShip(
          structuredClone(this.board),
          startRow,
          endRow,
          column,
          2,
          -1,
        )
      ) {
        fillWithShip(this.board, startRow, endRow, column, 2, -1);
        this.#placedShipsCount++;
        return true;
      } else if (
        this.#placedShipsCount === 1 &&
        !!fillWithShip(
          structuredClone(this.board),
          startRow,
          endRow,
          column,
          3,
          -2,
        )
      ) {
        fillWithShip(this.board, startRow, endRow, column, 3, -2);
        this.#placedShipsCount++;
        return true;
      } else if (
        this.#placedShipsCount === 2 &&
        !!fillWithShip(
          structuredClone(this.board),
          startRow,
          endRow,
          column,
          3,
          -3,
        )
      ) {
        fillWithShip(this.board, startRow, endRow, column, 3, -3);
        this.#placedShipsCount++;
        return true;
      } else if (
        this.#placedShipsCount === 3 &&
        !!fillWithShip(
          structuredClone(this.board),
          startRow,
          endRow,
          column,
          4,
          -4,
        )
      ) {
        fillWithShip(this.board, startRow, endRow, column, 4, -4);
        this.#placedShipsCount++;
        return true;
      } else if (
        this.#placedShipsCount === 4 &&
        !!fillWithShip(
          structuredClone(this.board),
          startRow,
          endRow,
          column,
          5,
          -5,
        )
      ) {
        fillWithShip(this.board, startRow, endRow, column, 5, -5);
        this.#placedShipsCount++;
        return true;
      }
    }

    function fillWithShip(obj, startRow, endRow, column, length, num) {
      let sliced = obj.slice(startRow, endRow);
      if (
        sliced.length < length ||
        sliced.filter((row) => row[column] !== 0).length !== 0
      )
        return false;
      for (let i = startRow; i < endRow; i++) {
        obj[i][column] = num;
      }
      return true;
    }
  }

  receiveAttack(row, column) {
    if (this.#gameOver === false) {
      let field = this.board[row][column];
      if (field !== 0 && field !== 1) {
        if (field === -1) {
          this.#twoLengthShip.hit();
          if (this.#twoLengthShip.sunk === true)
            this.#sunkShips.push(this.#twoLengthShip);
        } else if (field === -2) {
          this.#threeLengthShipOne.hit();
          if (this.#threeLengthShipOne.sunk === true)
            this.#sunkShips.push(this.#threeLengthShipOne);
        } else if (field === -3) {
          this.#threeLengthShipTwo.hit();
          if (this.#threeLengthShipTwo.sunk === true)
            this.#sunkShips.push(this.#threeLengthShipTwo);
        } else if (field === -4) {
          this.#fourLengthShip.hit();
          if (this.#fourLengthShip.sunk === true)
            this.#sunkShips.push(this.#fourLengthShip);
        } else if (field === -5) {
          this.#fiveLengthShip.hit();
          if (this.#fiveLengthShip.sunk === true)
            this.#sunkShips.push(this.#fiveLengthShip);
        }
        this.areAllShipsSunk();
        return true;
      } else if (field !== 1) {
        this.board[row][column] = 1;
        return false;
      }
    }
  }

  areAllShipsSunk() {
    if (this.#sunkShips.length === 5) this.#gameOver = true;
  }

  getSunkShips() {
    return this.#sunkShips;
  }

  getShipsCount() {
    return this.#placedShipsCount;
  }
}
