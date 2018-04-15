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
    this.squareSize = (canvasSize-1)/size ;
    this.board = Array(size * size).fill(-1);
    this.path = [];
  }
  draw() {
    let size = this.size,
      squareSize = this.squareSize;
    if(squareSize < 20) { fill(255); stroke(0); } 
    else { noFill(); stroke(255); }
    for (var i = 0; i < size; ++i) {
      for (var j = 0; j < size; ++j) {
        rect(i * squareSize, j * squareSize, squareSize, squareSize);
      }
    }
  }
  solve() {
    // initialize matrices
    var N = this.size;
    this.board = [...Array(N + 1)].map(e => Array(N + 1).fill(-1));
    var degreeMatrix = [...Array(N + 1)].map(e => Array(N + 1).fill(0));
    // initialize step count
    var step = 1;
    // initialize ordering
    var t = 0;
    var rowLimit = 1;
    var colLimit = 1;
    var currRow = 1;
    var currCol = 1;
    var mod = N % 8;

    // initialize degree matrix
    for (var i = 1; i <= N; ++i) {
      for (var j = 1; j <= N; ++j) {
        for (var k = 0; k < 8; ++k) {
          var tempRow = i + moves[k].row;
          var tempCol = j + moves[k].col;
          if (1 <= tempRow && tempRow <= N && 1 <= tempCol && tempCol <= N) 
            ++degreeMatrix[i][j];
          }
        }
    }

    //do knight tour until terminated
    while (true) {
      this.board[currRow][currCol] = step++;
      // push position to path
      this.path.push(new Position(currRow,currCol));
      
      // change ordering if necessary
      if (currRow === rowLimit && currCol === colLimit) ++t;

      // get current order
      var T = ordering[mod][t - 1].order;
      var rowLimit = ordering[mod][t - 1].posLimit(mod).row;
      var colLimit = ordering[mod][t - 1].posLimit(mod).col;
      
      // get minimum degree based on order
      var newRow, newCol;
      var min_deg = 9;
      for (var k = 1; k <= 8; ++k) {
        var tempRow = currRow + moves[T[k - 1] - 1].row;
        var tempCol = currCol + moves[T[k - 1] - 1].col;
        if (1 <= tempRow && tempRow <= N && 1 <= tempCol && tempCol <= N && this.board[tempRow][tempCol] === -1) {
          degreeMatrix[tempRow][tempCol] = degreeMatrix[tempRow][tempCol] - 1;
          if (degreeMatrix[tempRow][tempCol] < min_deg) {
            newRow = tempRow;
            newCol = tempCol;
            min_deg = degreeMatrix[tempRow][tempCol];
          }
        }
      }

      // terminate if minimum not found, else continue tour
      if(min_deg === 9) break;
      else {
        currRow = newRow;
        currCol = newCol;
      }
    }
  }

  drawPath() {
    // console.log("draw called");
    var path = this.path;
    // console.log(path);
    var lastX = this.squareSize / 2;
    var lastY = this.squareSize / 2;
    var sq = this.squareSize;
    var color = sq < 20 ? 0 : 255;
    var sz = this.size;
    path.forEach((pos, i, a) => {
      if(!animatedInput.checked()) {
        var x = pos.col * sq - sq / 2;
        var y = pos.row * sq - sq / 2;
        var xx = x - sq / 2;
        var yy = y - sq / 2;
        // console.log(`(${lastX}, ${lastY}) -> (${x}, ${y})`);
        stroke(color);
        line(lastX, lastY, x, y);
        noStroke();
        fill(50, 255, 50);
        ellipse(x, y, Math.max(3, sq / 7));
        stroke(color);
        lastX = x;
        lastY = y;
      } else {
        setTimeout(function () {
          var x = pos.col * sq - sq / 2;
          var y = pos.row * sq - sq / 2;
          var xx = x - sq / 2;
          var yy = y - sq / 2;
          // console.log(`(${lastX}, ${lastY}) -> (${x}, ${y})`);
          stroke(color);
          line(lastX, lastY, x, y);
          noStroke(); fill(50, 255, 50);
          ellipse(x, y, Math.max(3, sq / 7));
          stroke(color);
          lastX = x;
          lastY = y;
          // console.log(2000 / (sz*sz) * i);
        }, sz > 200 ? 0 : 2000 / (sz*sz) * i);
      }
      
    });
  }
}
