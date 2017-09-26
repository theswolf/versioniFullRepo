import { Ricerca } from './../ricerca/ricerca';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Autori } from '../../pages/autori/autori';
//import { AutoriComponent } from '../../components/autori/autori'  
/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController) {
    
      }
    
 

    openPage(page:any) {
      switch (page) {
        case 'aut':
          this.navCtrl.push(Autori);
          break;
        default:
        this.navCtrl.push(Ricerca,{
          "searchtype":page
        });
      }
     
    }

}
