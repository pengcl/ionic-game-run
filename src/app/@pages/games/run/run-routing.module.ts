import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {GamesRunCreatePage} from './create/create.page';
import {GamesRunListPage} from './list/list.page';
import {GamesRunItemPage} from './item/item.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
    },
    {
        path: 'list',
        component: GamesRunListPage
    },
    {
        path: 'item/:id',
        component: GamesRunItemPage
    },
    {
        path: 'create',
        component: GamesRunCreatePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RunPageRoutingModule {
}
