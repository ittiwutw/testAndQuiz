import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


//////
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Platform } from 'ionic-angular';

//////
declare var window: any;



@IonicPage()
@Component({
  selector: 'page-assignment',
  templateUrl: 'assignment.html',
})
export class AssignmentPage {


  constructor(
    public navCtrl: NavController,
    private fileChooser: FileChooser,
    private file: File,
    private camera: Camera,
    private filePath: FilePath,
    public platform: Platform,
    private alertCtrl: AlertController) {
  }

  chooseVideoX() {
    if (this.platform.is('ios')) {
      //this.chooseIOS();
    } else if (this.platform.is('android')) {
      //this.chooseAndroid();
    }
  }

  chooseVideo(assignmentType) {
    let alert = this.alertCtrl.create({
      title: 'Please Enter your information for submission.',
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
              if (this.platform.is('ios')) {
                this.chooseIOS(data.name, assignmentType);
              } else if (this.platform.is('android')) {
                this.chooseAndroid(data.name, assignmentType);
              }
            } else {
              return false;
            }

          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  //////////// Android
  chooseAndroid(submitter, assignmentType) {
    this.fileChooser.open().then((uri) => {
      //alert(uri);

      this.filePath.resolveNativePath(uri).then(filePath => {
        //alert(filePath);
        let dirPathSegments = filePath.split('/');
        let fileName = dirPathSegments[dirPathSegments.length - 1];
        dirPathSegments.pop();
        let dirPath = dirPathSegments.join('/');
        this.file.readAsArrayBuffer(dirPath, fileName).then(async (buffer) => {
          await this.upload(buffer, submitter, assignmentType);
        }).catch((err) => {
          alert(err.toString());
        });
      });
    });
  }


  async upload(buffer, submitter, assignmentType) {//////

    let blob = new Blob([buffer], { type: "video/mp4" })
    let storage = firebase.storage();

    var fileName = 'VID-' + assignmentType + '-' + submitter;

    storage.ref('videos/' + fileName).put(blob).then((d) => {
      //alert('Upload Complete!!');
    }).catch((error) => {
      //alert(JSON.stringify(error))
      alert("can not upload");
    })
  }


  ///////////////////// IOS apple
  chooseIOS(submitter, assignmentType) {

    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      // encodingType: this.camera.EncodingType,
      mediaType: this.camera.MediaType.VIDEO

    }
    this.camera.getPicture(cameraOptions)
      .then((_imagePath) => {

        //alert('got image path ' + _imagePath);
        // convert picture to blob
        return this.makeFileIntoBlob(_imagePath);
      }).then((_imageBlob) => {
        //alert('got image blob ' + _imageBlob);
        // upload the blob
        return this.uploadToFirebase(_imageBlob, submitter, assignmentType);
      }).then((_uploadSnapshot: any) => {
        alert('file uploaded successfully!! ');
        // store reference to storage in database  
      }, (_error) => {
        alert('Error ' + (_error.message || _error));
      });


  }
  makeFileIntoBlob(_imagePath) {

    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: 'video/mp4' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
            console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }
  uploadToFirebase(_imageBlob, submitter, assignmentType) {
    var fileName = 'VID-' + assignmentType + '-' + submitter + '.mp4';

    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('videos/' + fileName);

      var uploadTask = fileRef.put(_imageBlob);

      uploadTask.on('state_changed', (_snapshot) => {
        console.log('snapshot progess ' + _snapshot);
      }, (_error) => {
        reject(_error);
      }, () => {
        // completion...
        resolve(uploadTask.snapshot);
      });
    });
  }

}
