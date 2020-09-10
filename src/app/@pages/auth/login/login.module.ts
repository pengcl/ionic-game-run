import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {AuthLoginPage} from './login.page';

@NgModule({
  imports: [
    IonicModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: AuthLoginPage}])
  ],
  declarations: [AuthLoginPage]
})
export class AuthLoginPageModule {
}
