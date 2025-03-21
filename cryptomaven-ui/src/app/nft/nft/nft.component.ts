import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chain } from '../../models/Chain';

import { NftsService } from '../nfts.service';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})

export class NftComponent implements OnInit { 
  @Output() nftDeleted = new EventEmitter();
  @Input('inputNft') nft: any;  
  @Input() nftData: any;

  @Input()
  chains: Chain[] = [];
name: any;
  
  viewNft() {} 
    constructor(private nftsService: NftsService) { }

  ngOnInit(): void {
   this.name  = this.nftData.nftName;
    // this.nft = this.nftsService.nftUpdated();
            }
  onClicked() {
    // this.nftDeleted.emit(this.name);
    this.nftsService.deleteNft(this.nft.name);
  } 
  newNftData: any = {
    nftName: 'TwoNFT',
    description: 'This is the first NFT',
    image: 'assets/groot.png',
    price: 0.01,
    owner: '0x0f0c0000f0',
    contract: '0x00000000',
    idToken: 0
  };
}
