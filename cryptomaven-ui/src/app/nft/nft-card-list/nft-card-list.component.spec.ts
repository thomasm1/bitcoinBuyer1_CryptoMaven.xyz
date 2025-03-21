import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftCardListComponent } from './nft-card-list.component';

describe('NftCardListComponent', () => {
  let component: NftCardListComponent;
  let fixture: ComponentFixture<NftCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NftCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
