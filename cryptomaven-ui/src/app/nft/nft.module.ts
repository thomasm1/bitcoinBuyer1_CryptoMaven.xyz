import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NftsComponent } from '../nft/nfts.component';
import { NftComponent } from '../nft/nft/nft.component';
import { NftAddComponent } from '../nft/nft-add/nft-add.component';
import { ChaindataComponent } from '../nft/chaindata/chaindata.component';
import { NftCardListComponent } from '../nft/nft-card-list/nft-card-list.component';
import { NftDialogComponent } from '../nft/nft-dialog/nft-dialog.component';
import { AddressComponent } from '../nft/address/address.component';
import { MatTabsModule } from '@angular/material/tabs';  
import { MaterialModule } from '../material.module';
// import { LoaderComponent } from '../layout/loader/loader.component';
// import { SharedModule } from '../shared/shared.module'; // Import SharedModule

@NgModule({
  declarations: [
    NftsComponent,
    NftComponent,
    // LoaderComponent,
    NftAddComponent,
    ChaindataComponent,
    NftCardListComponent,
    NftDialogComponent,
    AddressComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    // LoaderComponent,
    MaterialModule,
    // SharedModule,  
  ],
  exports: [
    NftsComponent,
    NftComponent,
    // LoaderComponent,
    NftAddComponent,
    ChaindataComponent,
    NftCardListComponent,
    NftDialogComponent,
    AddressComponent,
    // MatTabsModule, 
  ],
})
export class NftModule {}
