function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

class Position {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

class SquareBoard {
  constructor(size) {
    this.size = size;
    this.squareSize = Math.min(canvasSize / size, canvasSize / size) - 1;
    this.board = Array(size * size).fill(-1);
    this.path = [];
  }
  draw() {
    let size = this.size,
      squareSize = this.squareSize;

    for (var i = 0; i < size; ++i) {
      for (var j = 0; j < size; ++j) {
        // noStroke(); if ((i + j) % 2 == 0)
        fill(255);
        // else fill(0);
        rect(i * squareSize, j * squareSize, squareSize, squareSize);
      }
    }
  }

  limits(pos) {
    let row = pos.row,
      col = pos.col;
    return ((row >= 0 && col >= 0) && (row < this.size && col < this.size));
  }

  isempty(pos) {
    let row = pos.row,
      col = pos.col;
    return this.limits(pos) && this.board[row * this.size + col] < 0;
  }

  getDegree(pos) {
    let count = 0,
      row = pos.row,
      col = pos.col;
    for (var i = 0; i < 8; ++i) {
      if (this.isempty(row + moves[i].row, col + moves[i].col)) {
        ++count;
      }
    }
    return count;
  }

  neighbour(pos1, pos2) {
    for (var i = 0; i < 8; ++i) {
      if (pos1.row + moves[i].row === pos2.row && pos1.col + moves[i].col === pos2.col) {
        return true;
      }
    }
    return false;
  }

  nextMove1(pos) {
    let row = pos.row,
      col = pos.col,
      N = this.size;
    let min_idx = -1;
    let min_deg = 100;

    var start = rand(0, 1e9) % 8;
    for (var j = 0; j < 8; ++j) {
      let i = (start + j) % 8;
      let nrow = row + moves[i].row;
      let ncol = col + moves[i].col;
      let npos = new Position(nrow, ncol);
      let c = this.getDegree(npos);
      if (this.isempty(npos) && c < min_deg) {
        min_idx = i;
        min_deg = c;
      }
    }
    // console.log(min_idx); console.log(moves[min_idx]);

    if (min_idx === -1) 
      return new Position(-1, -1);
    
    let newRow = row + moves[min_idx].row;
    let newCol = col + moves[min_idx].col;
    let newPos = new Position(newRow, newCol);

    this.board[newPos.row * N + newPos.col] = this.board[row * N + col] + 1;
    return newPos;
  }

  findClosedTour() {
    this.board = Array(this.size * this.size).fill(-1);
    this.path = [];
    var startPos = new Position(0, 0);
    var currPos = startPos;
    var endPos = new Position(-1, -1);
    this.board[currPos.row * this.size + currPos.col] = 0;

    for (var i = 0; i < this.size * this.size; ++i) {
      if (equal(currPos, endPos)) 
        return false;
      this
        .path
        .push(currPos);
      currPos = this.nextMove1(currPos);
    }
    console.log(currPos, startPos);
    // if(!this.neighbour(startPos,currPos)) return false;

    return true;
  }

  solve1() {
    var count = 0;
    var found = false;
    while (++count < 1e5 && !(found = this.findClosedTour())) 
      console.log(count);
    noFill();
    textAlign(CENTER, CENTER);
    beginShape();
    for (var i = 0; i < this.path.length; ++i) {
      let c = this.path[i].col;
      let r = this.path[i].row;
      let x = this.squareSize / 2 + c * this.squareSize;
      let y = this.squareSize / 2 + r * this.squareSize;
      vertex(x, y);
      fill(0);
      ellipse(x, y, 10);
      let s = this
        .board[r * this.size + c]
        .toString();
      textSize(32);
      text(s, x, y);
      noFill();
    }
    endShape();
  }
}
