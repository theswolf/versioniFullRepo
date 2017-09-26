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

  shareBy(prov:string){
    var share;
   let message="Ho trovato questa versione '"+this.version.titolo+" ( "+this.author.name+" ) con l'app Versioni Di Latino";
   let image="/assets/images/icon.png";
   let url="";
    switch (prov) {
        case 'fb':
        share = this.social.shareViaFacebook
        break;
        case 'tw':
        share = this.social.shareViaTwitter
        break;
        case 'wh':
        share = this.social.shareViaWhatsApp
        break;
        case 'em':
        share = this.social.shareViaEmail
        break;
    
      default:
        break;
    }
    share(message,image,url);
  }

 
}
