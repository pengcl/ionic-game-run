import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {PickerService} from '../../../../@core/modules/picker';
import {FieldsComponent} from '../../../../@theme/components/fields/fields';
import {FieldItem} from '../../../../@theme/components/fields/fields.interface';
import {PeoplesComponent} from '../../../../@theme/components/peoples/peoples';

import {AuthService} from '../../../auth/auth.service';
import {RunService} from '../run.service';

import {forkJoin} from 'rxjs';

const PRICES = [
    {label: '1元', value: '1'},
    {label: '2元', value: '2'},
    {label: '5元', value: '5'},
    {label: '其它', value: '0'}
];

@Component({
    selector: 'app-games-run-create',
    templateUrl: './create.page.html',
    styleUrls: ['./create.page.scss'],
})
export class GamesRunCreatePage implements OnInit {
    public id: string;
    user = this.authSvc.currentUser;
    form: FormGroup = new FormGroup({
        price: new FormControl(null, [Validators.required]),
        players: new FormControl(null, [Validators.required]),
        peripheries: new FormControl(null, [])
    });

    constructor(@Inject('PREFIX_URL') private PREFIX_URL,
                private http: HttpClient,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private modalController: ModalController,
                private pickerSvc: PickerService,
                private authSvc: AuthService,
                private runSvc: RunService) {
        runSvc.gamers().subscribe(res => {
        });
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.queryParamMap.get('id');
        if (this.id) {
        }
    }

    async presentFieldModal(fields: FieldItem[]) {
        const modal = await this.modalController.create({
            showBackdrop: true,
            component: FieldsComponent,
            componentProps: {fields}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss(); // 获取关闭传回的值
        if (data) {
            for (const key in data) {
                if (data[key]) {
                    this.form.get(key).setValue(data[key]);
                }
            }
        }
    }

    async presentPeoplesModal(field: { label: string, name: string, value: string }) {
        const modal = await this.modalController.create({
            showBackdrop: true,
            component: PeoplesComponent,
            componentProps: {field}
        });
        await modal.present();
        const {data} = await modal.onDidDismiss(); // 获取关闭传回的值
        if (data) {
            const value = [];
            for (const key in data) {
                if (data[key]) {
                    value.push(data[key]);
                }
            }
            this.form.get(field.name).setValue(value);
        }
    }

    pickerShow(field) {
        this.pickerSvc.show([PRICES], null, [0], {}).subscribe(res => {
            const price = parseInt(res.value, 10);
            if (price) {
                this.form.get(field.name).setValue(price);
            } else {
                this.presentFieldModal([field]).then();
            }
        });
    }

    submit() {
        if (this.form.invalid) {
            return false;
        }
        const posts = [];
        if (this.form.get('players').value) {
            this.form.get('players').value.forEach(player => {
                posts.push(this.runSvc.addGamer(player, 1));
            });
        }
        if (this.form.get('peripheries').value) {
            this.form.get('peripheries').value.forEach(periphery => {
                posts.push(this.runSvc.addGamer(periphery, 0));
            });
        }
        const body = {price: this.form.get('price').value, gamers: [], owner: this.user.id};
        forkJoin(posts).subscribe(gamers => {
            gamers.forEach(gamer => {
                // @ts-ignore
                body.gamers.push(gamer.id);
            });
            this.runSvc.create(body).subscribe(res => {
                this.router.navigate(['/run/item', res.id]).then();
            });
        });
    }

}
