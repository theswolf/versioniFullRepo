import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';




import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LandingPage } from '../pages/landing/landing';
import { Autori } from '../pages/autori/autori';
import { Footer } from '../pages/footer/footer';
import { Versioni } from './../pages/versioni/versioni';
import { Traduzioni } from './../pages/traduzioni/traduzioni';
import { Traduzione } from './../pages/traduzione/traduzione';
import { Ricerca } from './../pages/ricerca/ricerca';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataStore } from '../providers/data-store/data-store';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LandingPage,
    Autori,
    Versioni,
    Traduzioni,
    Traduzione,
    Footer,
    Ricerca
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LandingPage,
    Autori,
    Versioni,
    Traduzioni,
    Traduzione,
    Footer,
    Ricerca
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataStore
  ]
})
export class AppModule {}
