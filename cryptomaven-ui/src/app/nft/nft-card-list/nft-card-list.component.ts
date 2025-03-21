import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {filter, tap} from 'rxjs/operators';

import {NftDialogComponent} from '../nft-dialog/nft-dialog.component';
import {Address} from '../../models/Address';


@Component({
  selector: 'app-nft-card-list',
  templateUrl: './nft-card-list.component.html', 
  styles:[`
    .mat-card {
      margin: 10px;
      }
    strong {
     width:30px;
    }`],
  changeDetection: ChangeDetectionStrategy.OnPush // less greedy/requires 
})
export class NftCardListComponent implements OnInit {
  @Input() addresses!: Address[];
   
  @Output() 
  private nftChanged = new EventEmitter();

  constructor(private dialog:MatDialog ) { }

  ngOnInit() {
  }

  editAddress(address: Address) {
    console.log(address);
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = address;
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(NftDialogComponent, dialogConfig);

    dialogRef.afterClosed()
    .pipe(
      filter(address => !!address),
      tap(address => console.log(address)),
      tap(() => this.nftChanged.emit())
    )
    .subscribe();
  }

}
