import { Injectable } from '@angular/core';
import { KeyService } from '../services/auth/key.service';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment  as env  }from "../../environments/environment";
import { catchError, Observable, throwError, tap } from "rxjs";
// import Moralis from 'moralis'.default();
// import { EvmChain } from '@moralisweb3/evm-utils'
import { AuthStore } from '../services/auth/auth-aws-store.service';
import { Subject } from 'rxjs';
import { LoaderService } from '../layout/loader/loader.service';
import { Coin } from '../models/Coin';
import { User } from '../models/User'; 
import { Address } from '../models/Address';

@Injectable({
  providedIn: 'root'
})

export class NftsService {

  currUser: User | undefined;
  key: string = '';
  chainStr: string = 'ethereum';
  addressStr: string =   '0x900bE021E38B8d08435A03c05657C8cFA837cAeF';
  coin: Coin = {} as Coin; 
  nftCoins: Coin[] = [];

  nftsUpdated = new Subject<any[]>();
  nftDataUpdated = new Subject<Coin>();
  addressUpdated = new Subject<Address>();
 
  constructor(
    private http: HttpClient,
    private keyService: KeyService,
    private loaderService: LoaderService,
    private authStore: AuthStore,
  ) {
    this.key = this.keyService.getMoralisKey();

  }
/////////////////////// NFT REF  
 ngOnInit() {
   this.findAddressById("1").subscribe({
    next: (address: Address) => { 
      this.addressUpdated.next(address);
    }
  });
  const nftRefs = this.nftRefsUpdated().subscribe({ 
    next: (nftRefs: Address) => {
      this.addressUpdated.next(nftRefs);
    }
  });
  this.loaderService.showLoaderUntilCompleted(new Observable<unknown>()); 
  // this.currUser = this.authStore.currentUserValue;
  
  this.currUser = this.authStore.currentUserValue;
  }


  findAddressById(id:string): Observable<Address> {
    return this.http.get<Address>(`${env.nft_url}/addresses/${id}`) 
    // return this.http.get<NftRef>(`${env.nftsURL}/api/nft-refs/${name}${env.test_env}`)
  }
  
  nftRefsUpdated(): Observable<any> {
    return this.http.get(`${env.nft_url}/addresses`)
    // return this.http.get(`${env.nftsURL}/api/nft-refs${env.test_env}`)
    .pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      }))
     
  }
  
  nftMockUpdated(): Observable<any> {  
    
    return this.http.post(`${env.nft_url}/nfts`, { chain: this.chainStr, address: this.addressStr })
    // return this.http.get(`${env.nftsURL}/api/nft-refs${env.test_env}`)
    .pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      }))
     
  }
  getNftCoin() { 
    return this.coin;
  }


  collectAddresses() {
    return this.http.get(`${env.nft_url}/addresses${env.test_env}`)
    .pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      })) 
  }
  getAllNfts() {
    return this.http.get(`${env.nft_url}/nfts${env.test_env}`)
    .pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      })) 
    // return [...this.nfts];
  }
 
  deleteNft(id: number) {
    this.nftCoins = this.nftCoins.filter((nft: Coin) => {
      return nft.id !== id;
    });
    this.nftsUpdated.next(this.nftCoins);
  } 

 ///// nftFromChain //////////
  collectNftsFromChain(): Observable<any> {
    let chain = this.chainStr; 
       let   address = this.addressStr;  
    return this.http.post(`${env.nftFromChain}/nft${env.test_env}`, { chain: chain, address: address })
    .pipe(
      catchError(err => {
        throw 'error in source. Details: ' + err;
      })) 
  } 

  chainNftData(chain: string, address: string): Observable<any> {
    if (!chain) {      chain = this.chainStr;   }
    if (!address) {      address = this.chainStr;   }

  return  this.http.post<Coin>(`${env.nftFromChain}/nft${env.test_env}`, { chain: chain, address: address },
      {
        headers: new HttpHeaders({
          Accept: 'application/json'
        })
      })
      .pipe(
        catchError(err => {
          throw 'error in source. Details: ' + err;
        }),
        tap((data: any) => {
          this.coin = data;
          console.log(this.coin);
          this.nftDataUpdated.next(this.coin); 
          
          this.nftCoins.push(this.coin);
          this.nftsUpdated.next([...this.nftCoins]);
        })
      ) 
  }
 


  
}
