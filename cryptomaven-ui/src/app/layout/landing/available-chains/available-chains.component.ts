import { Component, Inject,   } from '@angular/core';

import { Chain } from 'src/app/models/Chain';  
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChainService } from '../../../../services/chain-service';
import { ChainStore } from 'cryptomaven-ui/src/app/services/chain-store.service';
import { AddressService } from 'cryptomaven-ui/src/app/services/address.service';
import { Address } from '../../../../models/Address';
@Component({
  selector: 'app-available-chains',
  // standalone: true,
  templateUrl: './available-chains.component.html',
  styleUrls: ['./available-chains.component.css'],
  // imports: [PlacesContainerComponent],
  providers: [
    ChainService, 
    ChainStore, AddressService
  ],
})
export class AvailableChainsComponent {
  isFetching = new BehaviorSubject<boolean>(false);
  chain: Chain;
  chains: Chain[] = [];
  addresses: Address[] = [];
  constructor(
    @Inject(ChainService) private chainsServices: ChainService,
    @Inject(AddressService) private addressesService: AddressService
  ) {
   
    this.chainsServices.loadAllChains().subscribe((chains: Chain[]) => {
      this.chains = chains;
    });
    // this.addresses = this.chainsServices.getAddresses();
  }  

ngOnInit() {
  this.isFetching.next(true);
  const subscription = this.chainsServices.loadAllChains().subscribe({
    next: (chains) => {
      this.isFetching.next(false);
      console.log(chains);
    },
    error: (error) => {
      console.error(error);
    }
  });
  const landing: Observable<Address[]> =  this.chainsServices.loadAllChainAddresses(Number(this.chain.id));
  // const chain: BehaviorSubject<Chain> = this.chainsServices.getChain();
  const coinsSubscription = this.chainsServices.loadAllChainAddresses(Number(this.chain.id)).subscribe({
    next: (addresses) => {
      console.log('User places loaded', addresses);
    },
    error: (error) => {
      console.error('Error loading user places', error);
    }
  });
 

}

onSelectChain(chain: Chain) {
  const subscription  = this.addressesService.addChainToUserCoins(chain, "1" ).subscribe({
    next: (chain) => {
      console.log('chain added to user coins');
      console.log(chain);
      this.chains.push(...chain);
    },
    error: (error) => {
      console.log('error adding chain to user coins');
    }
  });


}

}

