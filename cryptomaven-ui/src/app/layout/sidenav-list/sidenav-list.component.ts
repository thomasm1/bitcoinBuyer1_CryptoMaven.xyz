import { Component, OnInit, EventEmitter , Output, OnDestroy} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
 
import { ActivatedRoute } from '@angular/router';
import { AuthStore } from '../../services/auth/auth-aws-store.service';
import { AuthFirebaseStoreService } from '../../services/auth/auth-firebase-store.service';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit { // }, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
 
  variable: any; 
  isAdmin$: Observable<boolean> = this.adminAuth.isAdminLoggedIn$;
  isLoggedIn$: Observable<boolean> = this.authStore.isLoggedIn$;
 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,  
    public authStore: AuthStore,
    public adminAuth: AuthFirebaseStoreService
    ) { }

  ngOnInit() {
    this.variable = this.route.snapshot.params['name']; 
  }

  logout() {
    this.authStore.logout();
    this.adminAuth.logout();
  }

  onClose() {
    this.closeSidenav.emit();
  }
 
}
