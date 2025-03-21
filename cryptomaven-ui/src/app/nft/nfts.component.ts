 
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subject, Subscription, tap } from 'rxjs';
 import { MatTab } from '@angular/material/tabs';
import { NftsService } from './nfts.service'; 

// import { Chain } from '../../models/Chain';
import { ChainStore } from '../services/chain-store.service';
import { Address } from '../models/Address';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.component.html',
  styles: [
  `.container-panel {
    max-width:400px;
    margin:0 auto;
  }
  `
  ],
  // providers: [LoaderService]
  
}) 
export class NftsComponent implements OnInit, OnDestroy { 
   
  chain: string = 'ethereum'; // default chain
  // chains$!: Observable<Chain[]>;

  nfts: any;
  nftData: any;
  tokens: any = [];
  addresses:any;
  addressArrs: any = [];

  // chainDataUpdated = new Subject<any[]>();
  private nftDataSubscription: Subscription = new Subscription;

  nftsUpdated = new Subject<any[]>();
  addressesUpdated = new Subject<Address>();
  private nftSubscription: Subscription = new Subscription;
  private addressSubscription: Subscription = new Subscription;

  constructor(
    private nftsService: NftsService,
    private store: ChainStore
  ) {
    // this.nftData = this.showChainData();
    // this.nfts = this.loadNftsFromChain();
    // this.addresses = this.loadNftRefs();

    
  }

  ngOnInit(): void { 
    //  this.chains$ = this.store.selectAllChains();
    //  console.log("init",this.chains$)
 
    this.nftDataSubscription = this.nftsService.nftDataUpdated.subscribe(() => {
      this.nftData = this.nftsService.collectNftsFromChain();
     }
     );
 
     this.nftSubscription = this.nftsService.nftsUpdated.subscribe(() => {
       this.nfts = this.nftsService.collectNftsFromChain();
     });
 
     this.addressSubscription = this.nftsService.addressUpdated.subscribe(() => {
      this.addresses = this.nftsService.collectAddresses();
   
    });
  }
  showChainData() {
    return this.nftData;
    console.log("chain", this.nftData);
  }
  // loadChains(): Observable<Chain[]> {
  //   this.chains$ = this.store.selectAllChains();
  //   console.log("loadchains")
  //   return this.chains$
  // }
  loadNftRefs() {
 this.nftsService.collectAddresses() 
    .pipe( 
      map((res: { [key: string]: any }) => { 
        console.log("res")
        console.log(res)
        for(let i in res) {
          this.addressArrs.push({ ...res[i] });
        }
        // for (const key in res) {
        //   if (res.hasOwnProperty(key)) {
            // this.addressArrs.push({ ...res[key], name: key });
        //   }
        // }
        return this.addressArrs;          
      }),
      tap(
        (dataArray: any) => {
          if (dataArray != undefined) { 
            this.addresses = dataArray; 
            console.log("this.addresses")
            console.log(this.addresses); 
          }
        }
      ),
    ).subscribe();
  };

  loadNftsFromChain() {
    this.nfts = this.nftsService.collectNftsFromChain()
      .subscribe((data: any) => {
        if (data != undefined) {
          this.nftData = data;
          console.log("this.nftData")
          console.log(this.nftData);

          this.tokens = data.tokens;

          this.nfts = data.nfts;
          console.log(this.nfts);
          console.log(this.nfts[0]);
          this.nftsUpdated.next([...this.nfts]);
        }
      });
  }

  ngOnDestroy(): void {
    this.nftSubscription.unsubscribe();
    this.nftDataSubscription.unsubscribe();
    this.addressSubscription.unsubscribe();
  }

}
