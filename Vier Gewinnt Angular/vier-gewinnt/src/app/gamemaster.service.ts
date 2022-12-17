import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface iGamestate {
  playerText: string;
  move: number;
  gameOver: boolean;
}

export interface iMoveCount {
  player1Count: number;
  player2Count: number;
}

@Injectable({
  providedIn: 'root',
})
export class GamemasterService {
  interval: any;
  totalSeconds: number = 0;
  constructor() {}
  player1Count: number = 0;
  player2Count: number = 0;

  getHallo = (): void => {
    console.log('Hallo Welt');
    let test: Date = new Date();
    console.log(test.getUTCSeconds())
  };

  getEmptyGameState = (): iGamestate => {
    return {
      gameOver: false,
      move: 0,
      playerText: 'Spieler 1 ist am Zug!',
    };
  };

  public gamestateSubject: BehaviorSubject<iGamestate> =
    new BehaviorSubject<iGamestate>(this.getEmptyGameState());

  public playerCountSubject: BehaviorSubject<iMoveCount> =
    new BehaviorSubject<iMoveCount>({player1Count: 0, player2Count: 0});

  updateGameState = (data: iGamestate): void => {
    this.gamestateSubject.next(data);
  };

  //-----------------------------------------------------------------------------------
  addPlayer1MoveCount = ():void => {
    this.playerCountSubject.next({player1Count: this.player1Count +1 , player2Count: this.player2Count})
    this.player1Count++;
  }
  addPlayer2MoveCount = ():void => {
    this.playerCountSubject.next({player1Count: this.player1Count, player2Count: this.player2Count + 1})
    this.player2Count++;
  }

  //-----------------------------------------------------------------------------------
  startTimer = ():void => {
    this.interval = setInterval(this.setTime, 1000);
  }


  setTime = () => {
    ++this.totalSeconds;
    console.log(this.secondsToTimerString(this.totalSeconds));
    //console.log(this.pad((this.totalSeconds / 60)))
  };

  secondsToTimerString(seconds: number) {
    let s: number | string = seconds % 60;
    let m: number | string = (seconds - s) / 60;
    s < 10 && (s = `0${s}`);
    m > 0 && m < 10 && (m = `0${m}`);
    return `${m}:${s}`;
  }


}
