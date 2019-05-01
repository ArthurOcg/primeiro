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
  resposta;
  img = '';
  retorno =''
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public analize: AnalizeProvider) {
    this.img = navParams.data;

  }

  ionViewWillEnter() {
    if (this.img) {
      console.log("Está com a imagem")
      this.analize.outra(this.img).subscribe(res => {
        console.log("Chamou.")
        this.resposta = res;
        this.retorno = this.resposta.imagem;
        console.log(res.histo_cort)
      }, error => {
        this.ERROR = error;
        console.error(error);
        //console.error("Deu erro", error.message, "status:", error.status, "code:", error.code, "erro:", error.error)
      });
    }
  }
}