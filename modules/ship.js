export default class Ship {
  constructor(length, index) {
    this.length = length;
    this.hitsNumber = 0;
    this.sunk = false;
    this.index = index;
  }

  hit() {
    this.hitsNumber += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.length === this.hitsNumber) this.sunk = true;
  }
}
