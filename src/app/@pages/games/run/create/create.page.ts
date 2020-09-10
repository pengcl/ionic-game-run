import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {PickerService} from '../../../../@core/modules/picker';

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
    form: FormGroup = new FormGroup({
        price: new FormControl(null, [Validators.required]),
        gamers: new FormControl(null, [Validators.required])
    });

    constructor(private activatedRoute: ActivatedRoute,
                private pickerSvc: PickerService) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.queryParamMap.get('id');
        if (this.id) {
        }
    }

    pickerShow() {
        this.pickerSvc.show([PRICES], null, [0], {}).subscribe(res => {
            console.log(typeof res.value);
            const price = parseInt(res.value, 10);
            if (price) {
                this.form.get('price').setValue(price);
            } else {
                return false;
            }
        });
    }

}
