import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';
import {RunService} from '../games/run/run.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.page.html',
    styleUrls: ['./index.page.scss'],
})
export class IndexPage {
    games;
    user = this.authSvc.currentUser;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private authSvc: AuthService,
                private runSvc: RunService) {
    }

    ionViewDidEnter() {
        this.getData();
    }

    getData() {
        this.runSvc.games({owner: this.user.id}).subscribe(res => {
            this.games = res;
        });
    }

    new() {
        this.router.navigate(['/run/create']).then();
    }

}
