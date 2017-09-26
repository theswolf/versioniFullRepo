import { Component } from '@angular/core';
import  { DataStore } from '../../providers/data-store/data-store'
import { NavController, NavParams } from 'ionic-angular';
import { Traduzioni } from './../traduzioni/traduzioni';

/**
 * Generated class for the VersioniPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'versioni',
  templateUrl: 'versioni.html',
})
export class Versioni {

  author: any;
  data: any = [];
  pageName: string = 'listaVersioni';
  
  colors = [
    'danger',
    'secondary',
    'energized',
    'royal',
    'subtle',
    'vibrant',
    'bright'
  ];
  constructor(public dataProvider : DataStore,public navCtrl: NavController, public navParams: NavParams) {
    this.author = navParams.get("author");
    let versCallback = function(val) {
      this.data = val;
      return true;
    }
    this.dataProvider.getVersioniPerAutore(this.author["id"],versCallback.bind(this));
  }

  traduzioniPerVersione(versione:any) {
    this.navCtrl.push(Traduzioni,{
      "author":this.author,
      "version":versione
    })
  }

  bindColor(index:number) {
    return this.colors[index%this.colors.length];
  }

}
