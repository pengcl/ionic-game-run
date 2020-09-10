import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {ErrorInterceptor} from './error.interceptors';
import {JwtInterceptors} from './jwt.interceptors';

export const INTERCEPTORS = [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptors, multi: true}
];
