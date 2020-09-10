import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StorageService} from '../../../@core/utils/storage.service';
import {ToastService} from '../../../@core/modules/toast';
import {DialogService} from '../../../@core/modules/dialog';
import {AuthService} from '../auth.service';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-auth-login',
    templateUrl: './login.page.html',
    styleUrls: ['../auth.page.scss', './login.page.scss']
})
export class AuthLoginPage {
    form: FormGroup;

    constructor(private router: Router,
                private statusBar: StatusBar,
                private storageSvc: StorageService,
                private toastSvc: ToastService,
                private dialogSvc: DialogService,
                private authSvc: AuthService) {
        this.form = new FormGroup({
            identifier: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    ionViewDidEnter() {
        this.statusBar.styleDefault();
    }

    ionViewDidLeave() {
        this.toastSvc.hide();
        this.statusBar.styleBlackTranslucent();
    }

    login() {
        if (this.form.invalid) {
            return false;
        }
        this.toastSvc.loading('登录中...', 0);
        this.authSvc.login(this.form.value).subscribe(res => {
            // 设置用户Token信息
            this.toastSvc.hide();
            this.authSvc.updateLoginStatus(res);
            this.router.navigateByUrl(this.authSvc.loginRedirectUrl);
        });

    }

}
