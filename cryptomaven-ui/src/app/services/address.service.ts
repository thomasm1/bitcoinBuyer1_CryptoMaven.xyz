import { Injectable, OnInit } from '@angular/core';
import { Address } from '../../../../src/app/models/Address';
import { Coin } from '../../../../src/app/models/Coin';
import { Chain } from '../../../../src/app/models/Chain';
import { tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AddressService implements OnInit {
  
  
  private userPlaces = new BehaviorSubject<Address[]>([]);
  private baseUrl: string = environment.nft_url;
  private coins: Coin[] = [];
  private chains: Chain[] = [];
  private userCoins = new BehaviorSubject<Coin[]>([]);
  private userChains = new BehaviorSubject<Chain[]>([]);
  private errorMessage = new BehaviorSubject<string>('');
  
  loadedUserPlaces = this.userPlaces.asObservable();
  
  constructor(private httpClient: HttpClient) {}
  
  ngOnInit() { 

    const subscriptionCoins = this.loadUserCoins("1", "No coins found").subscribe({
      next: (coins: Coin[]) => {
        this.coins = [...coins];
        this.userCoins.next([...coins]);
        console.log(coins);
        console.log(this.userCoins.asObservable());
      },
      error: (error) => {
        this.errorMessage.next(error);
        console.error(error);
      },
      complete: () => {
        subscriptionCoins.unsubscribe();
      }
    });

    const subscriptionChains = this.loadAvailableChains("1", "No chains found").subscribe(
      {
     next: (chains) => {
        this.chains = chains;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        subscriptionChains.unsubscribe();
      }
    });
  }
  
 
  loadUserCoins(addressId: string, errorMessage: string) {
    // return this.httpClient.get<Coin[]>(`${this.baseUrl}/addresses/${addressId}coins`).pipe( 
      return this.httpClient.get<Coin[]>(`${this.baseUrl}/coins`).pipe(
      tap({
        next: (coins: Coin[]) => {
          this.coins = coins;
        },
        error: (error) => { 
          console.error(errorMessage);
          console.error(error);
        },
      })
    );
  }
  loadAvailableChains(addressId: string,errorMessage: string) {
    return this.httpClient.get<Chain[]>(`${this.baseUrl}/chains`).pipe(
      tap(  {
        next: (chains: Chain[]) => {
          this.chains = chains;
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
  }  
  editCoinFromUserCoins(coin: Coin, addressId: string) {
    const coinId = coin.id;
    const preCoins = this.userCoins.getValue();
    if (preCoins.some((coin) => coin.id === this.userCoins[0].addressId)) { 
      this.userCoins.next([...preCoins, coin]);
    }
    return this.httpClient.put<Coin[]>(`${this.baseUrl}/addresses/${addressId}/coins`, "Coin not found").pipe(
      tap({
        next: (coins: Coin[]) => {
          this.coins = coins;
        },
        error: (error) => {
          console.error(error);
        }
      })
    );
  };

  addChainToUserCoins(chain: Chain, addressId: string) {
    const chainId = chain.id; 
    const prePlaces = this.userCoins.getValue();
    const preChains = this.userChains.getValue();
    if (!prePlaces.some((chain) => chain.id === this.userChains.getValue()[0]?.chainId)) {
      this.userChains.next([...preChains, chain]);
      return this.httpClient.put<Chain[]>(`${this.baseUrl}/addresses/${chain.chainId}/chains`, "Chain not found").pipe(
        tap({
          next: (chains: Chain[]) => {
            this.chains = chains;
          },
          error: (error) => {
            console.error(error);
          } 
        })
      );
    }
    return this.userChains.asObservable();
  }
  removeUserCoin(landing: Address) {
    // this.selectedLanding.emit(landing);

  }

 
  fetchUserChains(addressId: string, errorMessage: string) {
    if(addressId==null || addressId=="" ||errorMessage=="" || errorMessage ==null){
    addressId = "1";
    errorMessage = "No coins found";
    }
    return this.httpClient.get<Chain[]>(`${this.baseUrl}/addresses/${addressId}/chains`).pipe(
      tap({
        next: (chains: Chain[]) => {
          this.chains = chains;
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
    // return this.httpClient.get<{ coins: Coin[]}>(url).pipe(
    //   map((response) => {
    //     return response.coins.map((coin) => {
    //       return {
    //         ...coin,
    //         imageUrl: coin.imageUrl ? coin.imageUrl : 'assets/images/apprehensive-groot.jpg',
    //       };
    //     });
    //   })
    // );
  }

    fetchUserCoins(addressId: string, errorMessage: string) {
    if(addressId==null || addressId=="" ||errorMessage=="" || errorMessage ==null){
    addressId = "1";
    errorMessage = "No coins found";
    }
    return this.httpClient.get<Coin[]>(`${this.baseUrl}/addresses/${addressId}/coins`).pipe(
      tap({
        next: (coins: Coin[]) => {
          this.coins = coins;
        },
        error: (error) => {
          console.error(error);
        },
      })
    );
    // return this.httpClient.get<{ coins: Coin[]}>(url).pipe(
    //   map((response) => {
    //     return response.coins.map((coin) => {
    //       return {
    //         ...coin,
    //         imageUrl: coin.imageUrl ? coin.imageUrl : 'assets/images/apprehensive-groot.jpg',
    //       };
    //     });
    //   })
    // );
  }
}
 

