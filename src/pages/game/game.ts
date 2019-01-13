import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
  private newName = "";
  private roundText = "Next Round";
  private player = [];
  private gamePage = "game";
  private page = "game";
  private roundNum = 1;
  private rounds = [];
  private totalRounds = 0;
  private id = 0;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController) {

  }

  addPlayer(newName) {
    if(!(newName === "")) {
      this.player.push({
        id: this.id++,
        name: newName,
        score: [],
        guess: null,
        final: null,
        total: 0,
      });
      this.newName = "";
    }
  }

  removePlayer(p) {
    this.player.splice(this.player.indexOf(p), 1)
  }

  startGame() {
    this.gamePage = "menu";
    this.page = "menu";
    this.totalRounds = 60 / this.player.length;
  }

  nextRound() {
    if(this.roundNum < this.totalRounds) {
      if(this.verifyInput()){
        this.player.forEach((p) => {
          if(p.guess === p.final) {
            p.score.push(20 + p.guess * 10);
            p.total += 20 + p.guess * 10;
          }
          else {
            p.score.push(Math.abs(p.guess-p.final) * -10);
            p.total += Math.abs(p.guess-p.final) * -10;
          }
          p.guess = p.final = null;
        });
        this.rounds = this.player[0].score;

        this.roundNotification();
        this.roundNum++;
        if(this.roundNum === this.totalRounds) {
          this.roundText = "Finish";
        }
      }
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
    this.rounds = this.player[0].score;
    console.log(this.player);
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
  undoNotification() {
    let toast = this.toastCtrl.create({
      message: 'Undo successful!',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed undo notification');
    });

    toast.present();
  }

  roundNotification() {
    let toast = this.toastCtrl.create({
      message: 'Round ' + this.roundNum + ' recorded successfully!',
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed score notification');
    });

    toast.present();
  }

  ngOnInit() {
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
