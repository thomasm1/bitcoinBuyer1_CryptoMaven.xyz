import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap, catchError } from 'rxjs/operators';
 
import { Address } from '../../../../src/app/models/Address';
import { Coin } from '../../../../src/app/models/Coin';
import { User } from '../../../../src/app/models/User';
import { NftsService } from '../../../../src/app/components/nft/nfts.service';
import { AuthStore } from './auth/auth-aws-store.service';
import { AuthFirebaseStoreService } from './auth/auth-firebase-store.service';
import { Subject, throwError } from 'rxjs';
 
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  currUser: User | undefined;
  address: Address;
  email: string;
  nftData: any;

  addresses: Address[] = [];
  subjectAddress = new Subject<Address>();

  nftCoins: Coin[] = [];
  subjectNftCoin = new Subject<Coin>();
  constructor(
    private httpClient: HttpClient,
    private authStore: AuthStore,
    private adminAuth: AuthFirebaseStoreService,
    private nftService: NftsService,
  ) {

    this.email = localStorage.getItem('email') || '';
    this.address = { email: this.email, address: '', chain: '', coins: [] };
  }
  saveNftsToAws(chain: string, address: string) {
    this.currUser  = this.authStore.currentUserValue;
    this.email = localStorage.getItem('email') || 'unknown@gmail.com';
    this.nftData = this.nftService.getNftCoin();
    console.log("nftData", this.nftData);
    this.address = { chain, address, email: this.email, coins: this.nftData }
    this.httpClient.post<Coin>(
      `${environment.nft_url}/coins`,
      // 'https://friends-of-groot-default-rtdb.firebaseio.com/api/nft.json',
      this.address
    )
      .pipe(
        tap(response => {
          if (this.address) {
            if (this.address) {
              if (this.address) {
                if (this.address) {
                  this.address.id = response.id;
                }
              }
            }
          }
          console.log(this.address);
          this.nftService.nftsUpdated.next([this.address]);
        })
      );

  }
  savePersistedNfts(chain: string, addressStr: string) {
    // this.currUser  = this.authStore.currentUserValue;
    this.email = localStorage.getItem('email') || 'unkown@gmail.com';
    this.nftData = this.nftService.getNftCoin();
    console.log("nftData", this.nftData);
    this.address = { chain, address: addressStr, email: this.email } // , chain: this.addresses.map(add => add.chain).flat().join(', ') }
    this.httpClient.post<Address>(
      `${environment.nft_url}/addresses`,
      // 'https://friends-of-groot-default-rtdb.firebaseio.com/api/nft.json',
      this.address
    )
      .pipe(
        tap(response => {
          this.address.id = response.id || 0;
          console.log(this.address);
          this.nftService.nftsUpdated.next([this.address]);
        })
      );

  }
  editPersistedAddress(id: number, change: Address) {
    // const nft = this.nftService.getNftData();
    const addresses = this.addresses;
    const addressId = addresses.find(address => address.id === id);
    const newAddress: Address = {
      ...change
    };
    // const newAddresss: Address[] = addresss.map(address => {
    //   if (address.name === name) {
    //     return newAddress;
    //   } else {
    //     return address;
    //   }
    // });
    const newAddresses: Address[] = addresses.slice(0);
    this.address = newAddress;


    return this.httpClient
      .put<Address>(
        `${environment.nft_url}/addresses`,
        // `https://friends-of-groot-default-rtdb.firebaseio.com/api/nft/${name}.json`,
        change 
      )
      .pipe(
        catchError(err => {
          return throwError(err);
        }),
        tap(address => {
          this.nftService.addressUpdated.next(address);
        }),
        // shareReplay()
      );
    // .subscribe(response => {
    //   console.log(response);
    // } );
  }

  getAllAddresss() {
    return this.httpClient
      .get<{ [key: string]: Address }>(
        `${environment.nft_url}/addresses`,
        // 'https://friends-of-groot-default-rtdb.firebaseio.com/api/nft.json'
      )
      .pipe(
        map(res => {
          for (const key in res) { 
              if (res.hasOwnProperty(key)) {
                this.addresses.push({ ...res[key] });
              } 
          }
          console.log(this.addresses);
          return this.addresses;
        }
        ),
        tap(addresss => {
          console.log(this.addresses)
          this.nftService.nftsUpdated.next(this.addresses);
        })
      )
  }

  getNftById(id: string) {
    const Nfts = this.httpClient
      .get<Coin[]>(
        `${environment.nft_url}/coin/${id}`,
        // 'https://friends-of-groot-default-rtdb.firebaseio.com/api/nft.json'
      )
      .pipe(
        map(nfts => {
          return nfts.map(nft => {
            return {
              nft
              , tokens: nft.tokens ? nft.tokens : []
            };
          });
        }
        ),
        tap(nfts => {
          this.nftService.nftsUpdated.next(nfts);
        })
      )
  }


}
