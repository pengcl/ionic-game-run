import {Component, ErrorHandler} from '@angular/core';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-error',
  template: '',
})
export class AppErrorComponent implements ErrorHandler {

  constructor(private platform: Platform) {
  }

  handleError(error: any): void {
    const ERROR = {
      platform: this.platform.platforms(),
      url: window.location.href,
      error: error.toString()
    };
    console.error(ERROR);
  }
}
