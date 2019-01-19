import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LocalPlayersPage } from '../local-players/local-players';

import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider) {
  }

  startLocal() {
    this.navCtrl.push(LocalPlayersPage);
    this.database.reset();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
