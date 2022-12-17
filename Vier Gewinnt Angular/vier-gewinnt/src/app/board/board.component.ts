import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.setGame();
  }

  setGame = () => {
    console.log("Hallo")
  }
}
