import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../@core/utils/storage.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  public loginRedirectUrl: string;
  private loginStatus = new Subject<boolean>();

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient,
              private router: Router,
              private storage: StorageService) {
  }

  login(body): Observable<any> {
    return this.http.post('/api/auth/local', body);
  }

  register(body): Observable<any> {
    return this.http.post('/api/auth/local/register', body);
  }

  logout() {
    this.storage.clear();
    this.router.navigate(['/pages/auth']);
  }

  get token() {
    return  this.storage.get('token');
  }

  get currentUser() {
    const user = this.storage.get('user');
    return JSON.parse(user);
  }

  get isLogged(): boolean {
    this.loginStatus.next(!!this.currentUser);
    return !!this.currentUser;
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  updateLoginStatus(res) {
    this.storage.set('token', res.jwt);
    this.storage.set('user', JSON.stringify(res.user));
    this.loginStatus.next(this.isLogged);
  }
}
