import { Traduzione } from './../traduzione/traduzione';
import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import  { DataStore } from '../../providers/data-store/data-store'


/**
 * Generated class for the TraduzioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'traduzioni',
  templateUrl: 'traduzioni.html',
})
export class Traduzioni{

  author:any;
  version:any;
  data: any = [];
  pageName: string = 'listaTraduzioni';

  colors = [
    'danger',
    'secondary',
    'energized',
    'royal',
    'subtle',
    'vibrant',
    'bright'
  ];
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public dataProvider : DataStore) {
    this.author = navParams.get("author");
    this.version = navParams.get("version");

    let versCallback = function(val) {
      this.data = val;
      return true;
    }
    this.dataProvider.getTraduzioniPerVersione(this.version["id"],versCallback.bind(this));
  }

  bindColor(index:number) {
    return this.colors[index%this.colors.length];
  }

  goToTraduzione(author,version,trad){
    this.navCtrl.push(Traduzione,{
      "author":author,
      "version":version,
      "trad":trad
    });
  }

  



}
