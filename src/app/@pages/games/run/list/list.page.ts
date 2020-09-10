import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-games-run-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class GamesRunListPage implements OnInit {
    public folder: string;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    }

}
