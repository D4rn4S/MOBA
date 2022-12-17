import { Component, OnInit } from '@angular/core';
import { GamemasterService, iGamestate } from '../gamemaster.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  player1Count:number = 0;
  player2Count:number = 0;
  gamestate: iGamestate = this.gameMaster.getEmptyGameState();

  constructor(private gameMaster: GamemasterService) {}

  ngOnInit(): void {
    this.gameMaster.gamestateSubject.subscribe((newState) => {
      this.gamestate = newState;
    });

    this.gameMaster.playerCountSubject.subscribe((playerCount) => {
      this.player1Count = playerCount.player1Count;
      this.player2Count = playerCount.player2Count;
    })
  }
}
