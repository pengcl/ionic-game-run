import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './@pages/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    },
    {
        path: 'index',
        loadChildren: () => import('./@pages/index/index.module').then(m => m.IndexPageModule)
    },
    {
        path: 'run',
        canActivate: [AuthGuard],
        loadChildren: () => import('./@pages/games/run/run.module').then(m => m.RunPageModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./@pages/auth/auth.module').then(m => m.AuthPageModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
