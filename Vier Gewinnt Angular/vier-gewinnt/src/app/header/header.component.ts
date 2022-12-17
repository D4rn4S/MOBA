import { Component, OnInit } from '@angular/core';
import { GamemasterService, iGamestate } from '../gamemaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  gamestate: iGamestate = this.gameMaster.getEmptyGameState();
  winnerText: string = '';

  //timer
  totalSeconds: number = 0;

  constructor(private gameMaster: GamemasterService) {}

  ngOnInit(): void {
    this.gameMaster.gamestateSubject.subscribe((newState) => {
      this.gamestate = newState;

      //player status
      if (this.gamestate.move < 1) {
        this.gamestate.playerText = 'Spieler 1 startet!';
      } else {
        this.gamestate.playerText = newState.playerText;
      }

      //winner status
      if (newState.gameOver) {
        this.winnerText = 'Spieler 2 gewinnt!';
      }
    });
  }
}
