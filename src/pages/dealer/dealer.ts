import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderPage } from '../order/order';

import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-dealer',
  templateUrl: 'dealer.html',
})
export class DealerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider) {
  }

  ionViewDidLoad() {
  }

  chooseDealer(player: any) {
    this.database.setLeader(player);
    this.navCtrl.push(OrderPage);
  }
}
