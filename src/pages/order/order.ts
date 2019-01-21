import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { GamePage } from '../game/game';
/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider) {
  }

  ionViewDidLoad() {

  }

  gameStart() {
    this.navCtrl.pop();
    this.navCtrl.push(GamePage);
    this.database.initialize();
  }
}
