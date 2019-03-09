import { AnalizeProvider } from './../../providers/analize/analize';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [AnalizeProvider]
})
export class AboutPage {
  ERROR = ""
  img = '';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public analize: AnalizeProvider) {
    this.img = navParams.data;

  }

  ionViewWillEnter() {
    if (this.img) {

      this.analize.enviaImagem(this.img).subscribe(res => {
        console.log(res)
      }, error => {
        this.ERROR = error;
        console.error("Deu erro", error.message, "status:", error.status, "code:", error.code, "erro:", error.error)
      });
    }
  }
}
