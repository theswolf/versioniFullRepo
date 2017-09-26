import { Versioni } from './../versioni/versioni';
import { Component } from '@angular/core';
import  { DataStore } from '../../providers/data-store/data-store'
import { NavController,NavParams } from 'ionic-angular';

/**
 * Generated class for the AutoriComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'autori',
  templateUrl: 'autori.html'
})
export class Autori {


  text: string;
  data: any = [];
  colors = [
    'danger',
    'secondary',
    'energized',
    'royal',
    'subtle',
    'vibrant',
    'bright'
  ];
  pageName: string = 'listaAutori';

  constructor(public dataProvider : DataStore,public navCtrl: NavController,public navParams: NavParams) {
    this.dataProvider = dataProvider;
    this.text = 'Hello World';

    let authCallback = function(val) {
      this.data = val;
      return true;
    }
    this.dataProvider.getAuthor(authCallback.bind(this));
    /*this.dataProvider.getAuthor().subscribe(
      res => {
        //console.log(JSON.stringify(res.json()));
        this.data = res.json().author;
      },
      err => console.log(JSON.stringify(err.json()))
    );*/
  }



  authorFormat(autore) {
    
    let names:Array<string> = autore["name"].split(' ');
  
    return names.map(t=> { return t.substring(0,1)}).join('');
  }

  bindColor(index:number) {
    return this.colors[index%this.colors.length];
  }

 

  versionForAuthor(autore) {
    //let id:number = autore.id;
    this.navCtrl.push(Versioni,{"author":autore});
  }

}
