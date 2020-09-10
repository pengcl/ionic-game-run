import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../@theme/theme.module';
import {AuthRegisterPage} from './register.page';

@NgModule({
  imports: [
    IonicModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: AuthRegisterPage}])
  ],
  declarations: [AuthRegisterPage]
})
export class AuthRegisterPageModule {
}
