import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainComponent } from './chain/chain.component';
import { ChainsCardListComponent } from './chains-card-list/chains-card-list.component';
import { ChainDialogComponent } from './chain-dialog/chain-dialog.component';
import { SearchAddressesComponent } from './search-addresses/search-addresses.component';

@NgModule({
  declarations: [ChainComponent, ChainsCardListComponent, ChainDialogComponent, SearchAddressesComponent],
  imports: [CommonModule],
  exports: [ChainComponent, ChainsCardListComponent, ChainDialogComponent, SearchAddressesComponent],
})
export class ChainModule {}

