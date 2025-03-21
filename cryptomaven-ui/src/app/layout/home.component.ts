import { Component, OnInit,   ChangeDetectionStrategy  } from '@angular/core';
import { Chain  } from '../models/Chain';
import { Observable } from 'rxjs';
import { ChainStore } from '../services/chain-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  `.container-panel {
    max-width:400px;
    margin:0 auto;
  }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  chains$!: Observable<Chain[]>;
  ethereumChains$!: Observable<Chain[]>;
  pulseChains$!: Observable<Chain[]>;
  polygonChains$!: Observable<Chain[]>;

  constructor(private chainStore: ChainStore ) { }

  ngOnInit(): void {
    this.reloadChains();
  }

  reloadChains() {  
    this.chains$ = this.chainStore.selectAllChains();
    this.pulseChains$ = this.chainStore.filterByChainName('pulsechain'); 
    this.ethereumChains$ = this.chainStore.filterByChainName('ethereum'); 
    this.polygonChains$ = this.chainStore.filterByChainName('polygon');  
  }

}
