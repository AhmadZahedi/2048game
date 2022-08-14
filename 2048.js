var board;
var score = 0;
var rows = 4;
var columns = 4;

// const failure = document.getElementById("faile");
// failure.classList.remove("hidden");

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }

  setTwo();
  setTwo();
}

function checkGameResult() {
  let colBlocked;
  let rowBlocked;
  let colEqualCounter;
  let rowEqualCounter;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] === 2048) {
        const win = document.getElementById("win");
        win.classList.remove("hidden");
      }
    }
  }

  if (!hasEmptyTile()) {
    colBlocked = false;
    rowBlocked = false;
    colEqualCounter = 0;
    rowEqualCounter = 0;
    for (let c = 0; c < columns; c++) {
      for (let r = 1; r < rows; r++) {
        if (board[r - 1][c] !== board[r][c]) {
          colEqualCounter++;
          if (colEqualCounter === 12) {
            colBlocked = true;
          }
        }
      }
    }
    if (colBlocked) {
      for (let r = 0; r < rows; r++) {
        for (let c = 1; c < columns; c++) {
          if (board[r][c - 1] !== board[r][c]) {
            rowEqualCounter++;
            if (rowEqualCounter === 12 && board[r][c - 1] !== 2048) {
              rowBlocked = true;
            }
          }
        }
      }
    }

    if (colBlocked && rowBlocked) {
      const failure = document.getElementById("faile");
      failure.classList.remove("hidden");
    } else {
      colBlocked = false;
      rowBlocked = false;
    }
  }
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }

  return false;
}

function setTwo() {
  let found = false;

  if (!hasEmptyTile()) {
    return;
  }

  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    if (board[r][c] === 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");

      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    tile.classList.add("x" + num.toString());
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
    checkGameResult();
  } else if (e.code == "ArrowRight") {
    slideRight();
    setTwo();
    checkGameResult();
  } else if (e.code == "ArrowUp") {
    slideUp();
    setTwo();
    checkGameResult();
  } else if (e.code == "ArrowDown") {
    slideDown();
    setTwo();
    checkGameResult();
  }
  document.getElementById("score").innerText = score;
});

function filterZero(row) {
  return row.filter((num) => num != 0); //create a new array without zeroes
}

function slide(row) {
  // 1) get rid of zeroes
  row = filterZero(row); //[0, 2, 2, 2] => [2, 2, 2]

  // 2) slide
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    } // [2, 2, 2] => [4, 0, 2]
  }

  // 3) get rid of zeroes
  row = filterZero(row); // [4, 0 , 2] => [4, 2]

  // 4) add zeroes to right side
  while (row.length < columns) {
    row.push(0);
  } // [4, 2] => [4, 2, 0, 0]

  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
