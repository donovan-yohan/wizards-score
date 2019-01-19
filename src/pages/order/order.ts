import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  private leader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.leader = navParams.get('leader');
  }

  ionViewDidLoad() {

  }

  order() {
    console.log(this.leader)
  }
}
