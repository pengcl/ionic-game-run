import {Component, Inject} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';

@Component({
    selector: 'app-fields',
    templateUrl: 'fields.html',
    styleUrls: ['fields.scss']
})
export class FieldsComponent {
    fields;
    form: FormGroup;

    constructor(@Inject('PREFIX_URL') public PREFIX_URL, private navParams: NavParams, private modalController: ModalController, private fb: FormBuilder) {
        this.fields = navParams.data.fields;
        console.log(this.fields);
        this.form = this.createFormFields();
        /*this.form.addControl(this.field.value, fb.control('', []));
        console.log(navParams.data);*/
    }

    createFormFields() {
        const group = this.fb.group({});
        this.fields.forEach(field => {
            group.addControl(field.name, this.fb.control(field.value, [Validators.required]));
        });
        return group;
    }

    close() {
        this.modalController.dismiss(this.form.value).then();
    }
}
