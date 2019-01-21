import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
  private currentDealer: number;
  private page;
  private trick: number;
  private verified: boolean;

  private roundNum = 1;
  private totalRounds = 0;
  private id = 0;
  private maxScore = -999;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, public database: DatabaseProvider) {
    this.page = "guess";
    this.trick = 1;
    this.verified = false;
  }

  ionViewDidLoad() {
    this.dealerNotification();
    this.database.nextRound();
  }

  lastGuessEntered(index: number) {
    if (index > 0) {
      return this.database.getPlayer(index-1).guess !== undefined;
    } else {
      return true;
    }
  }

  addTrick(player: any) {
    player.final++;
    this.trick++;
    if(this.trick > this.database.getRound() && !this.verified) {
      this.verifyNotification();
    }
  }

  removeTrick(player: any) {
    player.final--;
    this.trick--;
  }

  nextRound() {
    if(this.database.getRound() < this.database.getTotalRounds()) {
      this.database.getPlayers().forEach((p) => {
        let score: number = 0;
        if(p.guess === p.final) {
          score = 20 + p.guess * 10;
        }
        else {
          score = Math.abs(p.guess-p.final) * -10;
        }
        p.scores.push(score);
        p.total += score;
        this.database.updateMaxScore(p.total);
        p.guess = undefined;
        p.final = 0;
      });

      let round = this.database.getRound();

      this.roundNotification(round);
      this.dealerNotification();
      this.database.nextRound();

      this.trick = 1;
      this.verified = false;
      this.page = "guess";
    }
    else {
      this.finish();
    }
  }
/**
  lastRound() {
    console.log(this.player);
    this.player.forEach(p => {
      p.total -= p.score.pop();
      p.guess = null;
      p.final = null;
    });
    this.maxScore = this.player[0].total;
    this.player.forEach(p => {
      this.maxScore = Math.max(this.maxScore, p.total);
    });
    this.rounds = this.player[0].score;
    this.undoNotification();
    this.roundNum--;
  }

  finish() {
    this.page = "scores";
    this.gamePage = "scores";
  }
*/

  playAgain() {
    let alert = this.alertCtrl.create({
    title: 'Restart Game?',
    message: 'Do you want to reset the game? (All current scores will be lost.)',
    buttons: [
     {
       text: 'No',
       role: 'cancel',
       handler: () => {
         console.log('Cancel clicked');
       }
     },
     {
       text: 'Yes',
       handler: () => {
         console.log('restarting...');
         this.navCtrl.setRoot(HomePage);
         this.database.reset();
         this.currentDealer = 0;
         this.trick = 1;
         this.verified = false;
       }
     }
    ]
    });
    alert.present();
  }

  dealerNotification() {
    let cards = this.database.getRound() + 1;
    let alert = this.alertCtrl.create({
      title: this.database.getPlayer(0).name + " is the Dealer!",
      subTitle: this.database.getPlayer(0).name + ' should deal each player '
                + cards + (cards === 1 ? ' card.' : ' cards.'),
      buttons: ['OK']
    });
    alert.present();
  }

  verifyNotification() {
    let toast = this.toastCtrl.create({
      message: 'All tricks completed! Review score and press continue when ready.',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    this.verified = true;
  }

  undoNotification() {
    let toast = this.toastCtrl.create({
      message: 'Undo successful!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  roundNotification(num) {
    let toast = this.toastCtrl.create({
      message: 'Round ' + num + ' recorded successfully!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  ngOnInit() {

  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
