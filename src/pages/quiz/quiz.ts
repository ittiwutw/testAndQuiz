import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {SubjectPage} from '../subject/subject'

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  quizDatas = [];
  subjectKey: any;
  chapterName: any;
  testerName: string = "";
  type: string = "Quiz";
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
    //this.quizDatas = navParams.get("data");
    this.chapterName = navParams.get("chapterName");
    this.subjectKey = navParams.get("subjectKey");

    this.setData(navParams.get("data"), "Quiz");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
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
      this.quizDatas.push(setData);
    }
    console.log(this.quizDatas);
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

  submit() {
    let replaced1 = this.chapterName.replace("&", "");
    let replaced2 = replaced1.replace("  ", " ");
    let replace3 = replaced2.replace("\u000b","")
    let chapterKey = replace3.split(' ').join('');
    let setData = {
      name: this.testerName,
      chapterName: this.chapterName.replace("\u000b",""),
      type: this.type,
      ans: this.setSelectedAns(),
      correct: this.isCorrect(),
      key: chapterKey
    }

    this.db.list("/quizSubmit/"+ chapterKey).push(setData);

    this.navCtrl.setRoot(SubjectPage,{subjectKey: this.subjectKey});
  }

  setSelectedAns() {
    let chooses = [];

    this.quizDatas.forEach(element => {
      chooses.push(element.choose);
    });

    return chooses;
  }

  isCorrect() {
    let score = 0;

    this.quizDatas.forEach(element => {
      if (element.choose == element.ans) {
        score = score + 1;
      }
    });

    return score;

  }

}
