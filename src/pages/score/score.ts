import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

/**
 * Generated class for the ScorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-score',
  templateUrl: 'score.html',
})
export class ScorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  playAgain() {
    let alert = this.alertCtrl.create({
    title: 'Restart Game?',
    message: 'Do you want to reset the game? (All current scores will be lost.)',
    buttons: [
     {
       text: 'No',
       role: 'cancel',
       handler: () => {}
     },
     {
       text: 'Yes',
       handler: () => {
         console.log('restarting...');
         this.navCtrl.setRoot(HomePage);
         this.database.reset();
       }
     }
    ]
    });
    alert.present();
  }
}
