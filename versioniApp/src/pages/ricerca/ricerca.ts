import { Traduzione } from './../traduzione/traduzione';
import  { DataStore } from '../../providers/data-store/data-store'
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RicercaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'ricerca',
  templateUrl: 'ricerca.html',
})
export class Ricerca {

  searchtype: string;
  data:any = [];
  pageName: string = 'ricercatitolo';
  
  colors = [
    'danger',
    'secondary',
    'energized',
    'royal',
    'subtle',
    'vibrant',
    'bright'
  ];

  searchstring :string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,public dataService:DataStore) {
    this.searchtype = this.navParams.get("searchtype");
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.searchstring  = ev.target.value;
}

  ricerca() {
    this.data = [];
    let that = this;
    switch (this.searchtype) {
      case 'tit':
        this.dataService.findByTitle( this.searchstring , function(d) {
          console.log(d);
          !!d && that.data.push(d);
          return true;
        });
        break;
        case 'tei':
        this.dataService.findByTextIta( this.searchstring , function(d) {
          !!d && that.data.push(d);
          return true;
        });
        break;
        case 'tel':
        this.dataService.findByTextLat( this.searchstring , function(d) {
          !!d && that.data.push(d);
          return true;
        });
        break;
    
      default:
        break;
    }
  }

  goToTraduzione(author,version,trad){
    this.navCtrl.push(Traduzione,{
      "author":author,
      "version":version,
      "trad":trad
    });
  }

  bindColor(index:number) {
    return this.colors[index%this.colors.length];
  }

 

}
