import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {StorageService} from '../../../@core/utils/storage.service';
import {ToastService} from '../../../@core/modules/toast';
import {DialogService} from '../../../@core/modules/dialog';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.page.html',
  styleUrls: ['../auth.page.scss', './register.page.scss']
})
export class AuthRegisterPage {
  form: FormGroup;
  visibility = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private storageSvc: StorageService,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private authSvc: AuthService) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(16)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(2)]),
      mobile: new FormControl('', [Validators.required, Validators.max(19999999999), Validators.min(10000000000)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.minLength(12)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl(this.route.snapshot.queryParams.type, [Validators.required])
    });
    this.form.get('mobile').valueChanges.subscribe(mobile => {
      if (this.form.get('mobile').valid) {
        this.form.get('username').setValue(mobile);
      }
    });
  }

  ionViewDidEnter() {
  }

  ionViewDidLeave() {
  }

  register() {
    if (this.form.invalid) {
      return false;
    }
    this.toastSvc.loading('注册中...', 0);
    this.authSvc.register(this.form.value).subscribe(res => {
      // 设置用户Token信息
      this.dialogSvc.show({content: '注册成功', cancel: '', confirm: '我知道了'}).subscribe(() => {
        // 设置用户Token信息
        this.toastSvc.hide();
        this.authSvc.updateLoginStatus(res);
        this.router.navigate(['/pages/' + res.user.type.value]);
      });
    });

  }

}
