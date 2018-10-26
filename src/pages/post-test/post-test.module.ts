import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostTestPage } from './post-test';

@NgModule({
  declarations: [
    PostTestPage,
  ],
  imports: [
    IonicPageModule.forChild(PostTestPage),
  ],
})
export class PostTestPageModule {}
