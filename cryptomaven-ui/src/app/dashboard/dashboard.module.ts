import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProtoCoinComponent } from '../dashboard/proto-coins/new-proto-coin/new-proto-coin.component';

@NgModule({
  declarations: [NewProtoCoinComponent],
  imports: [CommonModule],
  exports: [NewProtoCoinComponent],
})
export class DashboardModule {}
