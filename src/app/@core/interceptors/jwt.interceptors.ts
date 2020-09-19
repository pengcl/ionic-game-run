import {Inject, Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../@pages/auth/auth.service';

@Injectable()
export class JwtInterceptors implements HttpInterceptor {
    whiteList = [this.PREFIX_URL + '/auth/local', this.PREFIX_URL + '/auth/local/register'];
    constructor(@Inject('PREFIX_URL') private PREFIX_URL, private authSvc: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.whiteList.indexOf(req.url) === -1) {
            const JWT = {
                Authorization: 'Bearer ' + this.authSvc.token
            };
            req = req.clone({
                setHeaders: JWT
            });
        }
        return next.handle(req);
    }

}
