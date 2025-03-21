import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainsCardListComponent } from './chains-card-list.component';

describe('ChainsCardListComponent', () => {
  let component: ChainsCardListComponent;
  let fixture: ComponentFixture<ChainsCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainsCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChainsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
