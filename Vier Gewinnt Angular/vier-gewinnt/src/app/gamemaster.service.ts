import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface iGamestate {
  playerText: string;
  move: number;
  gameOver: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class GamemasterService {
  constructor() {}

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

  updateGameState = (data: iGamestate): void => {
    this.gamestateSubject.next(data);
  };

  secondsToTimerString(seconds: number) {
    let s: any = seconds % 60;
    let m: any = (seconds - s) / 60;
    s < 10 && (s = `0${s}`);
    m > 0 && m < 10 && (m = `0${m}`);
    return `${m}:${s}`;
  }
}
