import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SubjectPage } from '../pages/subject/subject';
import { ChapterPage } from '../pages/chapter/chapter';
import { TestListPage } from '../pages/test-list/test-list';
import { ProjectPage } from '../pages/project/project';
import { TestPage } from '../pages/test/test';
import { QuizPage } from '../pages/quiz/quiz';
import { AssignmentPage } from '../pages/assignment/assignment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { config } from './../firebase_cfg/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { InfoDataProvider } from '../providers/info-data/info-data';

import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
// import { Camera } from '@ionic-native/camera';
// import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase'

let configKey = {
  apiKey: "AIzaSyAe8_yDDprCu05SypCev1o6MzOqXRip_fc",
  authDomain: "tutor-bf9ed.firebaseapp.com",
  databaseURL: "https://tutor-bf9ed.firebaseio.com",
  projectId: "tutor-bf9ed",
  storageBucket: "tutor-bf9ed.appspot.com",
  messagingSenderId: "111362925101"
};
firebase.initializeApp(configKey);



import { MediaCapture } from '@ionic-native/media-capture';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SubjectPage,
    ChapterPage,
    TestListPage,
    TestPage,
    ProjectPage,
    QuizPage,
    AssignmentPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SubjectPage,
    ChapterPage,
    TestListPage,
    TestPage,
    ProjectPage,
    QuizPage,
    AssignmentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    InfoDataProvider,
    ImagePicker,
    MediaCapture,
    Base64,
    // Camera,
    // File,
    FileTransfer,
    FileTransferObject,
    FileChooser,File,FilePath, Camera,  /////

  ]
})
export class AppModule { }
