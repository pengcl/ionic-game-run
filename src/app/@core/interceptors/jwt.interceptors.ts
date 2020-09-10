import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../@pages/auth/auth.service';

const whiteList = ['/api/auth/local', '/api/types', '/api/auth/local/register'];

@Injectable()
export class JwtInterceptors implements HttpInterceptor {
    constructor(private authSvc: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (whiteList.indexOf(req.url) === -1) {
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
