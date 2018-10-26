import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProjectPage} from '../project/project'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  goUploadProject(){
    this.navCtrl.push(ProjectPage);
  }

}
