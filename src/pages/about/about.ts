import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  img = '';
  constructor(public navCtrl: NavController,  public navParams: NavParams) {
    this.img = navParams.data;
  }

}
