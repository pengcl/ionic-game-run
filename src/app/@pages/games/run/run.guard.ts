import {Injectable} from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route, ActivatedRoute
} from '@angular/router';
import {RunService} from './run.service';


@Injectable()
export class PropertyGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private runSvc: RunService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const url: string = state.url;
    return this.checkCreate(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {

    const url = `/${route.path}`;
    return this.checkCreate(url);
  }

  checkCreate(url: string): boolean {

    if (this.runSvc.isCreated) {
      return true;
    }

    this.runSvc.createdRedirectUrl = url;

    this.router.navigate(['/run/create']);

    return false;
  }
}
