import { Component, OnInit } from '@angular/core';
import { GamemasterService, iGamestate } from '../gamemaster.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  gamestate: iGamestate = this.gameMaster.getEmptyGameState();

  constructor(private gameMaster: GamemasterService) {}

  ngOnInit(): void {
    this.gameMaster.gamestateSubject.subscribe((newState) => {
      this.gamestate = newState;
    });
  }
}
