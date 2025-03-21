import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftDialogComponent } from './nft-dialog.component';

describe('NftDialogComponent', () => {
  let component: NftDialogComponent;
  let fixture: ComponentFixture<NftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
