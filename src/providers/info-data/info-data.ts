import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the InfoDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InfoDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello InfoDataProvider Provider');
  }

  getInfoData(pageId) {

    return this.http.get('../assets/data/'+pageId+'.json');
  }

}
