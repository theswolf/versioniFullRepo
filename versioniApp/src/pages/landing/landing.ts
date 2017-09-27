import { Ricerca } from './../ricerca/ricerca';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Autori } from '../../pages/autori/autori';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

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

  constructor(public navCtrl: NavController,private admobFree: AdMobFree) {
    
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


    banner() {
      console.log("banner init!!!");
      var that = this;
      const bannerConfig: AdMobFreeBannerConfig = {
        // add your config here
        // for the sake of this example we will just use the test config
        id:"ca-app-pub-0131970786644605/7012880271"
        //autoShow: true,
        //isTesting: true
        
       };
       that.admobFree.banner.config(bannerConfig);
       
       that.admobFree.banner.prepare()
         .then(() => {
           console.log("Banner should be visible");
           that.admobFree.banner.show();
           // banner Ad is ready
           // if we set autoShow to false, then we will need to call the show method here
         })
         .catch(e => console.log(e));
      
    }
  
    public ionViewDidLoad(){
     console.log("entered");
     this.banner();
    }

}
