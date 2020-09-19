import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../../@core/utils/storage.service';

export interface RecordDto {
    gamer: string;
    game: string;
    no: number;
    surplus: number;
    bombs: number;
}

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
        return this.http.get(this.PREFIX_URL + '/games', {params});
    }

    game(id): Observable<any> {
        return this.http.get(this.PREFIX_URL + '/games/' + id);
    }

    updateGame(id, body): Observable<any> {
        return this.http.put(this.PREFIX_URL + '/games/' + id, body);
    }

    removeGame(id): Observable<any> {
        return this.http.delete(this.PREFIX_URL + '/games/' + id);
    }

    create(body): Observable<any> {
        return this.http.post(this.PREFIX_URL + '/games', body);
    }

    addGamer(name, type): Observable<any> {
        return this.http.post(this.PREFIX_URL + '/gamers', {name, type});
    }

    removeGamer(id): Observable<any> {
        return this.http.delete(this.PREFIX_URL + '/gamers/' + id);
    }

    records(params): Observable<any> {
        return this.http.get(this.PREFIX_URL + '/records', {params});
    }

    addRecord(body: RecordDto): Observable<any> {
        return this.http.post(this.PREFIX_URL + '/records', body);
    }

    removeRecord(id): Observable<any> {
        return this.http.delete(this.PREFIX_URL + '/records/' + id);
    }

    gamers(): Observable<any> {
        return this.http.get(this.PREFIX_URL + '/gamers');
    }

    finishGame(id): Observable<any> {
        return this.http.put(this.PREFIX_URL + '/games/' + id, {finished: true});
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
