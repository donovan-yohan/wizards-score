import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
  private currentDealer: number;
  private page = "guess";
  private trick: number;
  private verified: boolean;

  private roundNum = 1;
  private totalRounds = 0;
  private id = 0;
  private maxScore = -999;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, public database: DatabaseProvider) {
    this.currentDealer = 0;
    this.trick = 1;
    this.verified = false;
  }

  ionViewDidLoad() {
    let round = this.database.getRound();
    this.currentDealer = round % this.database.getPlayers().length;
    this.dealerNotification(this.currentDealer);
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
/**
  nextRound() {
    if(this.roundNum < this.totalRounds) {
      if(this.verifyInput()){
        this.player.forEach((p) => {
          let score: number = 0;
          if(p.guess === p.final) {
            score = 20 + p.guess * 10;
          }
          else {
            score = Math.abs(p.guess-p.final) * -10;
          }
          p.score.push(score);
          p.total += score;
          this.maxScore = Math.max(this.maxScore, p.total);
          p.guess = p.final = null;
        });
        this.rounds = this.player[0].score;

        this.roundNotification();
        this.roundNum++;
        if(this.roundNum === this.totalRounds) {
          this.roundText = "Finish";
        }
      }
      let round = this.database.getRound();
      this.currentDealer = round % this.database.getPlayers().length;
      this.dealerNotification(this.currentDealer);
    }
    else {
      this.finish();
    }
  }

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
         this.gamePage = "game";
         this.page = "game";
         this.player = [];
         this.roundText = "Next Round";
         this.rounds = [];
         console.log('restarting...');
       }
     }
    ]
    });
    alert.present();
  }

  verifyInput(){
    let a = 0, b = 0;
    for(let i = 0; i < this.player.length; i++) {
      let p = this.player[i];

      if (p.guess === null || p.final === null) {
        let alert = this.alertCtrl.create({
          title: 'Empty Fields',
          subTitle: 'Make sure all fields have values entered.',
          buttons: ['OK']
        });
        alert.present();
        return false;
      }
      if (p.guess > this.roundNum) {
        let alert = this.alertCtrl.create({
          title: 'Invalid Guess',
          subTitle: 'A player cannot win more rounds than the number played.',
          buttons: ['OK']
        });
        alert.present();
        return false;
      }
      a += parseInt(p.guess)
      b += parseInt(p.final)
    }

    if (a === this.roundNum) {
      let alert = this.alertCtrl.create({
        title: 'Check Guess Total',
        subTitle: 'Total guesses cannot be equal to the number of rounds played.',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
    if (!(b === this.roundNum)) {
      let alert = this.alertCtrl.create({
        title: 'Check Final Total',
        subTitle: 'Total number of rounds won must equal number of rounds played.',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
    return true;
  }
*/
  dealerNotification(dealer: number) {
    let rnd = this.database.getRound() + 1;
    let alert = this.alertCtrl.create({
      title: this.database.getPlayer(dealer).name + " is the Dealer!",
      subTitle: this.database.getPlayer(dealer).name + ' should deal each player '
                + rnd + (rnd === 1 ? ' card.' : ' cards.'),
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

  roundNotification() {
    let toast = this.toastCtrl.create({
      message: 'Round ' + this.roundNum + ' recorded successfully!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {

  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
