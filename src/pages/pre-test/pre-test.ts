import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { TestListPage } from '../test-list/test-list'


/**
 * Generated class for the PreTestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pre-test',
  templateUrl: 'pre-test.html',
})
export class PreTestPage {

  testData = [];
  testerName: string = "";
  type: string = "";
  subject: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private alertCtrl: AlertController) {

    this.type = navParams.get("type");
    this.subject = navParams.get("subjectName");

    this.setData(navParams.get("data"), this.type);
  }

  ionViewDidLoad() {

    let alert = this.alertCtrl.create({
      title: 'You have 3 Mins',
      subTitle: 'Please....',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.setTimeout();
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  setTimeout() {
    setTimeout(() => {
      this.presentPrompt();
    }, 30000);
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Time out!!',
      message: 'Enter your name for submission.',
      inputs: [
        {
          name: 'name',
          placeholder: 'Your name'
        }
      ],
      buttons: [
        {
          text: 'Submit',
          handler: data => {
            if (data.name) {
              this.testerName = data.name;
              this.submit();
              this.navCtrl.setRoot(TestListPage);
            } else {
              return false;
            }

          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  submit() {
    let setData = {
      name: this.testerName,
      subject: this.subject,
      type: this.type,
      ans: this.setSelectedAns(),
      correct: this.isCorrect()
    }

    this.db.list("/testSubmit").push(setData);
  }

  setSelectedAns() {
    let chooses = [];

    this.testData.forEach(element => {
      chooses.push(element.choose);
    });

    return chooses;
  }

  isCorrect() {
    let score = 0;

    this.testData.forEach(element => {
      if (element.choose == element.ans) {
        score = score + 1;
      }
    });

    return score;

  }

  setData(data, type) {
    let size = data["" + type]["length"];

    for (var i = 0; i <= size - 1; i++) {
      let setData = {
        model: data["" + type][i]["model"],
        question: data["" + type][i]["question"],
        choice: this.setChoices(data["" + type][i]["choice"]),
        ans: data["" + type][i]["ans"],
        choose: ''
      }
      this.testData.push(setData);
    }
    console.log(this.testData);
  }

  setChoices(datas) {
    let size = datas["length"];
    let choiceData = [];
    for (var i = 0; i <= size - 1; i++) {
      choiceData.push({
        a: datas[i]["a"],
        b: datas[i]["b"],
        c: datas[i]["c"],
        d: datas[i]["d"],
      });
    }

    return choiceData;
  }


}
