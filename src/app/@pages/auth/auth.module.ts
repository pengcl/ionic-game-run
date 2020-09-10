import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
  imports: [
    IonicModule,
    ThemeModule,
    AuthRoutingModule
  ],
  declarations: []
})
export class AuthPageModule {
}
