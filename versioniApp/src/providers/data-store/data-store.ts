import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';

import 'rxjs/add/operator/map';

/*
  Generated class for the DataStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataStore {

  keys:Object = {
    "autori":"/assets/data/autori.json",
    "autoriversioni":"/assets/data/autoriversioni.json",
    "versioni":"/assets/data/versioni.json",
    "traduzioni":"/assets/data/traduzioni.json",
    "versionitraduzione":"/assets/data/versionitraduzione.json",
  };

  constructor(public http: Http,public events: Events) {
  
    //http.get("/assets/data/autori.json").subscribe(res => storage.set("autori",res.json()));
   /* http.get("/assets/data/autori.json").subscribe(res => this.setData("autori",res.json()));
    http.get("/assets/data/autoriversioni.json").subscribe(res => this.setData("autoriversioni",res.json()));
    http.get("/assets/data/versioni.json").subscribe(res => this.setData("versioni",res.json()));
    http.get("/assets/data/traduzioni.json").subscribe(res => this.setData("traduzioni",res.json()));
    http.get("/assets/data/versionitraduzione.json").subscribe(res => this.setData("versionitraduzione",res.json()));*/
  }

  private retrieveData(key:string,callback) { 
    let that = this;
    that.http.get(that.keys[key]).subscribe(
      res => {
        //console.log(JSON.stringify(res.json()));
        callback(res.json())}
    );
  }


  getAuthor(callback) {
    this.retrieveData("autori",callback);
  }

  getVersioniPerAutore(id:number,callback) {
    let that = this;
    let firstCallBack = function(data) {

      let vids = data["author_ver"].filter(av => av["aid"]==id);
      that.retrieveData('versioni', function(data) {
        
        let versioni = data['version'].filter(ver => {
          return vids.map(vid => vid['vid']).indexOf(ver['id']) > -1;
        });
        callback({'version':versioni});
        return true;
      } );
    
      return true;
    };
    //this.retrieveData(this.baseUrl+this.verForAuth+id,firstCallBack);
    this.retrieveData("autoriversioni",firstCallBack);
  }


  getTraduzioniPerVersione(id:number,callback) {
    let that = this;
    let firstCallBack = function(data) {
      let tids = data["ver_trans"].filter(vt=>vt['vid']==id);
      that.retrieveData('traduzioni',function(data){
        let traduzioni = data['translation'].filter(trad => {
          return tids.map(tid => tid['tid']).indexOf(trad['id']) > -1;
        });
        callback({'translation':traduzioni});
        return true;
      });
      return true;
    };

    this.retrieveData('versionitraduzione',firstCallBack);
  }


  private findFullAuthorByVersion(singletrad,callback) { 
    return function(fullauthor) {
      try {
      singletrad["autore"] = fullauthor["author"][0];
      callback(singletrad);
    }
    

          catch (e) {
            callback(undefined);
            console.error(e); 
          }
      return true;
    };
  }

  private findAuthorByVersion(singletrad,callback) { 
    var that = this;
    return function(author) {
      try {
      let authForVer = author["author_ver"][0];
     // that.retrieveData(that.baseUrl+that.fullAuthForVer+authForVer['aid'],that.findFullAuthorByVersion(singletrad,callback).bind(that));
     that.retrieveData('autori',function(data) {
       let auts = data['author'].filter(auth => auth['id']==authForVer['aid']);
       that.findFullAuthorByVersion(singletrad,callback).bind(that)({'author':auts});
     });
     
     //that.findFullAuthorByVersion(singletrad,callback).bind(that));
    }
    
          catch (e) {
            callback(undefined);
            console.error(e);
          }
      return true;
     
    };
  }

  private findFullVersionByTrad(singletrad,callback) { 
    var that = this;
    return function(fullversion) {
      try {
      singletrad["versione"] = fullversion["version"][0];

        that.retrieveData('autoriversioni',function(data) {
          let auver = data['author_ver'].filter(av => av['vid'] == singletrad["versione"]["id"]);
          that.findAuthorByVersion(singletrad,callback).bind(that)({'author_ver':auver});
        });
      //this.retrieveData(this.baseUrl+this.authForVer+singletrad["versione"]["id"],that.findAuthorByVersion(singletrad,callback).bind(that));
    }
    
          catch (e) {
            callback(undefined);
            console.error(e);
          }
   
      return true;
    }
  }

  private findVersionByTrad(singletrad,callback) {
    var that = this;
    return function(vers) {
      try {
        let versForTrans = vers["ver_trans"][0];
              //fullVersForTrans: any = "version?transform=1&filter=id,eq,"
              that.retrieveData('versioni',function(data) {
               
                let ver = data['version'].filter(v => v['id'] == versForTrans['vid']);
                that.findFullVersionByTrad(singletrad,callback).bind(that)({'version':ver});
              });
              //that.retrieveData(that.baseUrl+that.fullVersForTrans+versForTrans['vid'],that.findFullVersionByTrad(singletrad,callback).bind(that));
      }

      catch (e) {
        callback(undefined);
        console.error(e);
      }
      
      return true;
    };

   
  }

  private findByField(field:string,exp:string,callback) {
    let that = this;

    var firstCallback = function(data) {
      let trads = data["translation"].filter(trad=>trad[field].toUpperCase().indexOf(exp.toUpperCase())>-1);
      ( !trads || trads.lnegth == 0 ) && 
      console.log(JSON.stringify(trads));
      trads.map(singletrad=>{
        let singletradid = singletrad.id;
         // versForTrans: any = "ver_trans?transform=1&filter=tid,eq,"
        //that.retrieveData(that.baseUrl+that.versForTrans+singletradid,that.findVersionByTrad(singletrad,callback).bind(that));
        that.retrieveData('versionitraduzione',function(data) {
            let ver=data['ver_trans'].filter(v => v['tid'] == singletradid);
           
            that.findVersionByTrad(singletrad,callback).bind(that)({'ver_trans':ver});

        });
      });

      //callback(trads);

      return true;
    }

    that.retrieveData('traduzioni',firstCallback.bind(that));
  };

  findByTitle(title:string,callback) {
    this.findByField('titolo',title,callback);
  }

  findByTextIta(title:string,callback) {
    this.findByField('originale',title,callback);
  }

  findByTextLat(title:string,callback) {
    this.findByField('traduzione',title,callback);
  }

}
