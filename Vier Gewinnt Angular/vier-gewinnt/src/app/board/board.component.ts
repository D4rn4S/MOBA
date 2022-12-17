import { Component, OnInit } from '@angular/core';
import { GamemasterService, iGamestate } from '../gamemaster.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  player1: string = '1'; //rot
  player2: string = '2'; //gelb
  curPlayer: string = this.player1;
  gameOver: boolean = false;
  board: any;
  curColumns: any;
  rows: number = 6;
  columns: number = 7;
  playerText: string = 'Spieler 1 ist am Zug!';
  gamestate: iGamestate = this.gameMaster.getEmptyGameState();

  constructor(private gameMaster: GamemasterService) {}

  ngOnInit(): void {
    this.setGame();
    this.gameMaster.getHallo();
    this.gameMaster.gamestateSubject.subscribe((gameState) => {
      console.log(gameState);
    });
  }

  setGame = () => {
    this.board = [];
    this.curColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let i = 0; i < this.rows; i++) {
      //i is row
      let row = [];
      for (let j = 0; j < this.columns; j++) {
        //j is column
        row.push(' ');
      }
      this.board.push(row);
    }

    let tile: HTMLCollectionOf<Element> =
      document.getElementsByClassName('tile');
    for (var i = 0; i < tile.length; i++) {
      tile[i].addEventListener('click', (event) => {
        this.setPiece(event);
      });
    }
  };

  setPiece = (id?: any) => {
    //hier macht ne arrow function kein sinn, weil der Scope sonst nicht passt
    if (this.gameOver) {
      return;
    }
    console.log(id.path[0].id);
    let coords = id.path[0].id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = this.curColumns[c];
    if (r < 0) {
      return;
    }

    this.board[r][c] = this.curPlayer;
    let tile = document.getElementById(r.toString() + '-' + c.toString());
    if (this.curPlayer == this.player1) {
      tile!.classList.add('red-piece');
      this.playerText = 'Player 2 ist jetzt dran';
      this.curPlayer = this.player2;
      //gamestate change
      this.gamestate = {
        playerText: 'Player 2 ist jetzt dran',
        gameOver: this.gamestate.gameOver,
        move: this.gamestate.move + 1,
      };
      this.gameMaster.updateGameState(this.gamestate);
    } else {
      tile!.classList.add('yellow-piece');
      this.playerText = 'Player 1 ist jetzt dran';
      this.curPlayer = this.player1;
      //gamestate change
      this.gamestate = {
        playerText: 'Player 1 ist jetzt dran',
        gameOver: this.gamestate.gameOver,
        move: this.gamestate.move + 1,
      };
      this.gameMaster.updateGameState(this.gamestate);
    }

    r -= 1; //update row hight for column
    this.curColumns[c] = r; //update the array
    console.log(this.board);
    this.checkWinner();
  };

  checkWinner = () => {
    //horizontal
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] != ' ') {
          if (
            this.board[r][c] == this.board[r][c + 1] &&
            this.board[r][c + 1] == this.board[r][c + 2] &&
            this.board[r][c + 2] == this.board[r][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

    //vertikal
    for (let c = 0; c < this.columns; c++) {
      for (let r = 0; r < this.rows - 3; r++) {
        if (this.board[r][c] != ' ') {
          if (
            this.board[r][c] == this.board[r + 1][c] &&
            this.board[r + 1][c] == this.board[r + 2][c] &&
            this.board[r + 2][c] == this.board[r + 3][c]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

    //anti-diagonal
    for (let r = 0; r < this.rows - 3; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] != ' ') {
          if (
            this.board[r][c] == this.board[r + 1][c + 1] &&
            this.board[r + 1][c + 1] == this.board[r + 2][c + 2] &&
            this.board[r + 2][c + 2] == this.board[r + 3][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }

    //diagonal
    for (let r = 3; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] != ' ') {
          if (
            this.board[r][c] == this.board[r - 1][c + 1] &&
            this.board[r - 1][c + 1] == this.board[r - 2][c + 2] &&
            this.board[r - 2][c + 2] == this.board[r - 3][c + 3]
          ) {
            this.setWinner(r, c);
            return;
          }
        }
      }
    }
  };

  setWinner = (r: number, c: number) => {
    let winner = document.getElementById('winner');
    if (this.board[r][c] == this.player1) {
      winner!.innerText = 'Rot Gewinnt!';
      //gamestate change
      this.gamestate = {
        playerText: this.gamestate.playerText,
        gameOver: true,
        move: this.gamestate.move,
      };
      this.gameMaster.updateGameState(this.gamestate);
    } else {
      winner!.innerText = 'Gelb Gewinnt!';
      //gamestate change
      this.gamestate = {
        playerText: this.gamestate.playerText,
        gameOver: true,
        move: this.gamestate.move,
      };
      this.gameMaster.updateGameState(this.gamestate);
    }
    this.gameOver = true;
  };
}
