import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ChainDialogComponent} from '../chain-dialog/chain-dialog.component';
import {Chain} from '../../models/Chain';
import {filter, tap} from 'rxjs/operators';
import { ChainService } from 'cryptomaven-ui/src/app/services/chain-service';


@Component({
  selector: 'app-chains-card-list',
  templateUrl: './chains-card-list.component.html',
  styleUrls: ['./chains-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChainsCardListComponent implements OnInit {
  @Input() chains: Chain[]  ;
   
  @Output() // emit event to parent component to reload [ChangeDetection: ChangeDetectionStrategy.OnPush]
  private chainsChanged = new EventEmitter();

  constructor(private dialog:MatDialog, private chainService:ChainService ) { }

  ngOnInit() { 
  }

  editChain(chain: Chain) {
    console.log(chain);
     
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = chain;
    dialogConfig.width = '400px';

    const dialogRef = this.dialog.open(ChainDialogComponent, dialogConfig);

    dialogRef.afterClosed()
    .pipe(
      filter(chain => !!chain),
      tap(chain => console.log(chain)),
      tap(() => this.chainsChanged.emit())
    )
    .subscribe();
  }

  deleteChain(id: string) {
    this.chainService.deleteChain(id)
    .pipe(   
      tap(() => this.chainsChanged.emit()) // TODO check if chain deleting after delete
    )
    .subscribe((resp)=>console.log('Chain deleted: '+resp));
  }
}
