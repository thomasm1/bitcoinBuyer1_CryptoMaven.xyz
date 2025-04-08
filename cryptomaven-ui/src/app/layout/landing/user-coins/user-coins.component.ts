import { Component, OnInit, inject } from '@angular/core';
// import {DestroyRef} from '@angular/common';
import { ChainComponent } from '../../../chain/chain/chain.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { addressesService } from '../../../../services/address.service';
// import { CoinService } from '../../../../services/address.service';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Chain } from '../../../../models/Chain';
import { Coin } from '../../../../models/Coin'; // Adjust the import path as necessary
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-user-coins',
  // standalone: true,

  // PlacesContainerComponent
  imports: [],
  templateUrl: './user-coins.component.html',
  styleUrls: ['./user-coins.component.css'],
  providers: [addressesService,]
})
export class UserCoinsComponent implements OnInit {
  isFetching = new BehaviorSubject<boolean>(false);
  placeSelected: BehaviorSubject<Coin[]> = new BehaviorSubject<Coin[]>([]);
  error: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private addressesService = inject(addressesService);
  // private destroyed = inject(DestroyRef);
  constructor() { 
    this.addressesService = inject(addressesService);
    // this.destroyed = inject(DestroyRef);

  }
  landingsSubscription: Subject<Coin[]> = new Subject<Coin[]>();
  
  ngOnInit(): void {
    this.isFetching.next(true);
    const landingsSubscription = this.loadUserCoins().subscribe(
      (coins) => {
        this.isFetching.next(false);
        this.error.next('');
        this.placeSelected.next(coins);
        return landingsSubscription;
      }, (error) => {
        this.isFetching.next(false);
        this.error.next(error);
      }
    )
  }
  // ngBeforeDestroy() {
  //   this.subscription.unsubscribe();
  //   // this.destroyed();
  // }

  loadUserCoins(): Observable<Coin[]> {
    // Logic to load user coins, this could be an API call or some other logic
    console.log('Loading user coins...');
    return this.addressesService.fetchUserCoins(null, null).pipe(
      tap((coins) => {
        this.placeSelected.next(coins);
      })
    );
  }


}

