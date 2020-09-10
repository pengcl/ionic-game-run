import {Component} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-frame',
  templateUrl: 'frame.html',
  styleUrls: ['frame.scss']
})
export class FrameComponent {
  title = '媒体码';
  url;

  constructor(private statusBar: StatusBar,
              private modalController: ModalController,
              private navParams: NavParams) {
    statusBar.styleDefault();
    this.title = this.navParams.data.title ? this.navParams.data.title : '媒体码';
    this.url = this.navParams.data.url;
  }

  cancel() {
    this.modalController.dismiss('cancel').then();
  }

}
