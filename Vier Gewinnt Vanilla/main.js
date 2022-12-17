//credits to: https://www.youtube.com/watch?v=4ARsthVnCTg

const player1 = "1"; //rot
const player2 = "2"; //gelb
let curPlayer = player1;
let gameOver = false;
let board;
let curColumns;

const rows = 6;
const columns = 7;

window.onload = function () {
  setGame();
};

setGame = () => {
  board = [];
  curColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let i = 0; i < rows; i++) {
    //i is row
    let row = [];
    for (let j = 0; j < columns; j++) {
      //j is column
      row.push(" ");

      let tile = document.createElement("div");
      console.log(`${i.toString()}-${j.toString()}`);
      tile.id = `${i.toString()}-${j.toString()}`;
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
};

function setPiece() {
  //hier macht ne arrow function kein sinn, weil der Scope sonst nicht passt
  if (gameOver) {
    return;
  }
  console.log(this);
  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = curColumns[c];
  if (r < 0) {
    return;
  }

  board[r][c] = curPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (curPlayer == player1) {
    tile.classList.add("red-piece");
    let playerText = document.getElementById("curPlayer")
    playerText.innerText = "Player 2 ist jetzt dran"
    curPlayer = player2;
  } else {
    tile.classList.add("yellow-piece");
    let playerText = document.getElementById("curPlayer")
    playerText.innerText = "Player 1 ist jetzt dran"
    curPlayer = player1;
  }

  r -= 1; //update row hight for column
  curColumns[c] = r; //update the array
  console.log(board);
  checkWinner();
}

checkWinner = () => {
  //horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //vertikal
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //anti-diagonal
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  //diagonal
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] == board[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
};

setWinner = (r, c) => {
  let winner = document.getElementById("winner");
  if (board[r][c] == player1) {
    winner.innerText = "Rot Gewinnt!";
  } else {
    winner.innerText = "Gelb Gewinnt!";
  }
  gameOver = true;
};
