import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LandingPage } from '../pages/landing/landing';
import { Autori } from '../pages/autori/autori';
import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LandingPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public toastCtrl: ToastController,public events: Events,private admobFree: AdMobFree) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Landing', component: LandingPage },
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }
  

  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  initializeApp() {
    var that = this;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      const bannerConfig: AdMobFreeBannerConfig = {
        // add your config here
        // for the sake of this example we will just use the test config
        id:" ca-app-pub-0131970786644605/7012880271"
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



      this.events.subscribe('api:error', message => {
        //this.nav.push(this.rootPage);
        this.presentToast(message);
       
      });
    });
  }

  


}
