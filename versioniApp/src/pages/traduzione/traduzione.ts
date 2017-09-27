import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the TraduzionePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @Component({
  selector: 'traduzione',
  templateUrl: 'traduzione.html',
})
export class Traduzione {
  author:any;
  version:any;
  trad:any;
  pageName: string = 'traduzione';

  constructor(public navCtrl: NavController, public navParams: NavParams,public social:SocialSharing) {
    this.author = navParams.get("author");
    this.version = navParams.get("version");
    this.trad = navParams.get("trad");
  }

  share() {
    let message="Ho trovato questa versione '"+this.version.titolo+" ( "+this.author.name+" ) con l'app Versioni Di Latino";
    let image="assets/images/icon.png"
    this.social.share(message, "Scaricala anche tu", image, "https://www.google.com");
  }

  shareBy(prov:string){
    var share;
   let message="Ho trovato questa versione '"+this.version.titolo+" ( "+this.author.name+" )' con l'app Versioni Di Latino";
   let image="assets/images/icon.png";
   let url="https://play.google.com/store/apps/details?id=core.september.versioni&hl=it";
    switch (prov) {
        case 'fb':
        this.social.shareViaFacebook(message,null,url).then(function(res){
          console.log(res);
        });
        break;
        case 'tw':
        this.social.shareViaTwitter(message,null,url).then(function(res){
          console.log(res);
        });
        break;
        case 'wh':
        this.social.shareViaWhatsApp(message,null,url).then(function(res){
          console.log(res);
        });
        break;
            
      default:
        break;
    }
  }

 
}
