import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, NavParams } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz'

import { InfoDataProvider } from '../../providers/info-data/info-data';

/**
 * Generated class for the ChapterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chapter',
  templateUrl: 'chapter.html',
})
export class ChapterPage {

  @ViewChild('slider') slider: Slides;

  chapterName: String = "";
  chapterKey: String = "";
  subjectKey: String = "";
  datas = [];
  quizDatas: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public infoData: InfoDataProvider) {
    this.chapterName = navParams.get("chapterName");
    this.chapterKey = navParams.get("chapterKey");
    this.subjectKey = navParams.get("subjectKey");
    this.setData(navParams.get("data"));
    this.getQuizData();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChapterPage');
  }

  setData(chapterData) {
    let size = chapterData["" + this.chapterKey]["length"];

    for (var i = 0; i <= size - 1; i++) {
      let setData = {
        desc: chapterData["" + this.chapterKey][i]["desc"],
        img: chapterData["" + this.chapterKey][i]["img"]
      }
      this.datas.push(setData);
    }
  }

  getQuizData() {
    this.infoData.getInfoData(this.chapterKey).subscribe(result => {
      this.quizDatas = result;
    });
  }

  currentIndex = 0;

  nextSlide() {
    this.slider.slideNext();
  }

  previousSlide() {
    this.slider.slidePrev();
  }

  onSlideChanged() {
    this.currentIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.currentIndex);
  }

  doQuiz() {
    this.navCtrl.push(QuizPage, { chapterName: this.chapterName, data: this.quizDatas, subjectKey: this.subjectKey });
  }

}
