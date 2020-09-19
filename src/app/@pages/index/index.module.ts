import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {IndexPageRoutingModule} from './index-routing.module';

import {IndexPage} from './index.page';
import {ThemeModule} from '../../@theme/theme.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IndexPageRoutingModule,
        ThemeModule
    ],
    declarations: [IndexPage]
})
export class IndexPageModule {
}
