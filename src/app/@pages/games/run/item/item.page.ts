import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-games-run-item',
    templateUrl: './item.page.html',
    styleUrls: ['./item.page.scss'],
})
export class GamesRunItemPage implements OnInit {
    public folder: string;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    }

}
