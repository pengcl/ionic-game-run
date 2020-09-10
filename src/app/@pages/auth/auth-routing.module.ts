import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';

const routes: Routes = [

  {
    path: 'login',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./login/login.module').then(m => m.AuthLoginPageModule)
      }
    ]
  },
  {
    path: 'register',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./register/register.module').then(m => m.AuthRegisterPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AuthRoutingModule {
}
