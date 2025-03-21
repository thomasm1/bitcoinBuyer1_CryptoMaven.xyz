import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';     
import {Chain} from '../../models/Chain';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as day from 'day';
import { ChainStore } from '../../services/chain-store.service';
import { LoaderService } from '../../layout/loader/loader.service';  
import { Observable } from 'rxjs';
import { Constant } from '../../models/Constant';

@Component({
  selector: 'app-chain-dialog',
  templateUrl: './chain-dialog.component.html',
  styles: [` 
  mat-form-field {
    display: block;
    width: 100%;
  } 

  textarea {
      height: 100px;
      resize: vertical;
  } 
  `],
  providers: [LoaderService] 
})
export class ChainDialogComponent implements OnInit {
  form: FormGroup;
  chain: Chain;
  chainConstants = Constant.MORALIS_CHAINS;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChainDialogComponent>,
    @Inject(MAT_DIALOG_DATA) chain: Chain,
    private chainStore: ChainStore
  ) { 
    this.chain = chain;
    this.form = this.formBuilder.group({
      id: [chain.id, Validators.required],
      rpcUrl: [chain.rpcUrl, Validators.required],
      name: [chain.name, Validators.required],
      symbol: [chain.symbol, Validators.required],
      category: [chain.category, Validators.required],
      description: [chain.description, Validators.required],
      longDescription: [chain.longDescription, Validators.required],
      chainId: [chain.chainId, Validators.required],
      blockExplorerUrl: [chain.blockExplorerUrl, Validators.required],
      iconUrl: [chain.iconUrl, Validators.required],
      // releasedAt: [day(chain.releaseDate).format('YYYY-MM-DD'), Validators.required],
  });
}

  update() {
    const changes = this.form.value;
    this.chainStore.saveChain(+this.chain.id, changes).subscribe();
    this.dialogRef.close(changes);
  }

  save() {
    const changes = this.form.value;
    this.chainStore.saveChain(-1, changes).subscribe();
    this.dialogRef.close(changes);
  }
  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
