import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ToastService} from '../modules/toast';
import {DialogService} from '../modules/dialog';

import {lan} from '../lan';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private toastSvc: ToastService,
              private dialogSvc: DialogService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res, req, next),
      err => this.handleResponse(err, req, next)
    ));
  }

  private handleResponse(res: any, req, next): void {
    if (res.status !== 200) {
      if (res.status === 0) {
        this.toastSvc.hide();
        this.dialogSvc.destroyAll();
        this.dialogSvc.show({
          content: '无法链接服务器',
          cancel: '',
          confirm: '我知道了'
        }).subscribe();
      } else if (res.status === 401) {
        console.log(res);
        if (res.error) {
          console.log(res.error);
          this.toastSvc.hide();
          this.dialogSvc.show({
            content: lan(res.error.message),
            cancel: '',
            confirm: '我知道了'
          }).subscribe();
        }
        // this.router.navigate(['/pages/auth']);
      } else {
        if (res.error) {
          this.toastSvc.hide();
          this.dialogSvc.show({
            content: lan(res.error.data[0].messages[0].message),
            cancel: '',
            confirm: '我知道了'
          }).subscribe();
        }
      }
    }
  }
}
