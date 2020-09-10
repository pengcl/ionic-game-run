import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {ThemeModule} from '../../../@theme/theme.module';
import {RunPageRoutingModule} from './run-routing.module';
import {GamesRunListPage} from './list/list.page';
import {GamesRunItemPage} from './item/item.page';
import {GamesRunCreatePage} from './create/create.page';

@NgModule({
    imports: [
        FormsModule,
        IonicModule,
        RunPageRoutingModule,
        ThemeModule
    ],
    declarations: [
        GamesRunListPage,
        GamesRunItemPage,
        GamesRunCreatePage
    ]
})
export class RunPageModule {
}
