import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { DealerPage } from '../dealer/dealer';

import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-local-players',
  templateUrl: 'local-players.html',
})
export class LocalPlayersPage {
  private newName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider) {
    this.newName = "";
  }


  ionViewDidLoad() {

  }

  addPlayer(name: string) {
    this.database.addPlayer(name);
    this.newName = "";
  }

  startGame() {
    this.navCtrl.push(DealerPage);
  }
}
