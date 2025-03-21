import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from '@angular/router';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';
 
import { AuthFirebaseStoreService } from './auth-firebase-store.service';
import { AuthStore } from './auth-aws-store.service'
// import { Store } from '@ngrx/store';
import * as fromRoot from '../../../../../src/app/reducers/app.reducer';

@Injectable()
export class UserGuardService implements CanActivate, CanLoad {
  constructor(
    private adminAuthService: AuthFirebaseStoreService, 
    // private Store: Store<fromRoot.State>,
    private auth: AuthStore,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  
    if ( this.auth.isLoggedIn$ || this.adminAuthService.isAdminLoggedIn$
      // || this.store.select(fromRoot.getIsAuth).pipe(take(1))  
    ) {
      return true;
    } else {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
      // this.router.navigate(['/login']);
      return false;
    }
  }
  canLoad(route: Route) {
      if(this.auth.isLoggedIn$) {
        return true; 
      } else {
        this.router.navigate([])
        return false;
      }

  }
}
