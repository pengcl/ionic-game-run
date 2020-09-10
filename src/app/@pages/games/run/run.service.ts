import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../../@core/utils/storage.service';

@Injectable({providedIn: 'root'})
export class RunService {
  public createdRedirectUrl: string;
  private loginStatus = new Subject<boolean>();

  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient,
              private router: Router,
              private storage: StorageService) {
  }

  requestProperty() {
    this.router.navigate(['/pages/property/create']);
  }

  games(params): Observable<any> {
    return this.http.get('/api/games', {params});
  }

  create(body): Observable<any> {
    return this.http.post('/api/auth/local', body);
  }

  get currentProperty() {
    const user = JSON.parse(this.storage.get('user'));
    return user.property;
  }

  get isCreated(): boolean {
    this.loginStatus.next(!!this.currentProperty);
    return !!this.currentProperty;
  }
}
