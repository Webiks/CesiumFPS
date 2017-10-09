import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { AuthorizationMiddleware } from '../../../core/configured-apollo/network/authorization-middleware';
import { CurrentGame, GameFields, PlayerFields, Team } from '../../../types';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { AcEntity, AcNotification, ActionType } from 'angular-cesium';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { EndGameDialogComponent } from '../end-game-dialog/end-game-dialog.component';
import { MdDialog } from '@angular/material';
import { CharacterService, MeModelState, ViewState } from '../../services/character.service';
import * as _  from 'lodash';

@Component({
  selector: 'game-container',
  templateUrl: './game-container.component.html',
  styleUrls: ['./game-container.component.scss'],
})
export class GameContainerComponent implements OnInit, OnDestroy {
  private gameData$: Observable<GameFields.Fragment>;
  private game: CurrentGame.CurrentGame;
  private me: GameFields.Me;
  private gameDataSubscription: Subscription;
  private otherPlayers$: Subject<AcNotification> = new Subject<AcNotification>();
  private allPlayers$: Subject<PlayerFields.Fragment[]> = new Subject<PlayerFields.Fragment[]>();
  private killedDialogOpen = false;

  constructor(private gameService: GameService,
              private character: CharacterService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private ngZone: NgZone,
              private  dialog: MdDialog) {
  }

  ngOnInit() {

    const paramsSubscription = this.activatedRoute.params.subscribe(params => {
      this.ngZone.runOutsideAngular(() => {
        if (!params.playerToken) {
          this.router.navigate(['/']);
          paramsSubscription.unsubscribe();

          return;
        }

        AuthorizationMiddleware.setToken(params.playerToken);
        this.gameService.refreshConnection();
        this.gameData$ = (this.gameService.getCurrentGameData()).map(({gameData}) => gameData);
        this.gameDataSubscription = this.gameData$.subscribe(currentGame => {
          this.game = currentGame;
          this.me = currentGame.me;

          const allPlayers = [...this.game.players];
          if (this.me) {
            const overviewMode = this.me.type === 'OVERVIEW' || this.me['__typename'] === 'Viewer';

            if (!overviewMode) {
              this.character.syncState(this.me);
              allPlayers.push(this.me);
            }

            if (this.me.state === 'DEAD' && !this.killedDialogOpen) {
              this.openKilledDialog();
              if (this.character.initialized) {
                this.character.state = MeModelState.DEAD;
              }
            }
          }

          this.allPlayers$.next(allPlayers);
          this.game.players.map<AcNotification>(player => ({
            actionType: ActionType.ADD_UPDATE,
            id: player.id,
            entity: new AcEntity(player),
          })).forEach(notification => {
            this.otherPlayers$.next(notification);
          });
        }, e => {
          this.router.navigate(['/']);
        });
      });
    });
  }

  private openKilledDialog() {
    this.killedDialogOpen = true;
    this.dialog.open(EndGameDialogComponent, {
      height: '30%',
      width: '60%',
      disableClose: true,
      panelClass: 'general-dialog',
    }).afterClosed().subscribe((toOverView) => {
      if (toOverView) {
        this.character.viewState = ViewState.OVERVIEW;
      }
    });
  }

  ngOnDestroy() {
    if (this.gameDataSubscription) {
      this.gameDataSubscription.unsubscribe();
    }
  }

  getPlayers(team: Team) : Observable<PlayerFields.Fragment[]>{
     return this.allPlayers$.map((players)=>players.filter(p => p.team === team)).distinctUntilChanged((a,b)=> _.isEqual(a,b));
  }

}
