import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { DealerPage } from '../dealer/dealer';

import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-local-players',
  templateUrl: 'local-players.html',
})
export class LocalPlayersPage {
  @ViewChild('nameField') name;
  private newName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public database: DatabaseProvider) {
    this.newName = "";
  }


  ionViewDidLoad() {
    setTimeout(() => {
      this.name.setFocus();
    },150);
  }

  addPlayer(name: string) {
    this.database.addPlayer(name);
    this.newName = "";
    this.name.setFocus();
  }

  startGame() {
    this.navCtrl.push(DealerPage);
  }
}
