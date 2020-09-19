import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-peoples',
    templateUrl: 'peoples.html',
    styleUrls: ['peoples.scss']
})
export class PeoplesComponent {
    field;
    peoples: { id: number, label: string, name: string, value: string }[] = [{id: 0, label: '人员1', name: 'people0', value: ''}];
    form: FormGroup;

    constructor(@Inject('PREFIX_URL') public PREFIX_URL,
                private navParams: NavParams,
                private modalController: ModalController,
                private fb: FormBuilder) {
        this.field = navParams.data.field;
        this.form = this.initFormFields();
        if (this.field.name === 'players') {
            this.addPeople();
            this.addPeople();
        }
    }

    initFormFields() {
        const group = this.fb.group({});
        if (this.field.value) {
            this.field.value.forEach((field, index) => {
                group.addControl('people' + index, this.fb.control(field, [Validators.required]));
            });
        } else {
            group.addControl('people0', this.fb.control('', [Validators.required]));
        }
        return group;
    }

    addPeople() {
        const id = this.peoples[this.peoples.length - 1].id + 1;
        this.form.addControl('people' + id, this.fb.control('', [Validators.required]));
        this.peoples.push({id, label: '人员' + (id + 1), name: 'people' + id, value: ''});
    }

    removePeople(index) {
        const name = this.peoples[index].name;
        this.peoples.splice(index, 1);
        this.form.removeControl(name);
    }

    close() {
        this.modalController.dismiss().then();
    }

    submit() {
        this.modalController.dismiss(this.form.value).then();
    }
}
