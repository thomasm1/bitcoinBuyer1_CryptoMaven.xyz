import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainDialogComponent } from './chain-dialog.component';

describe('ChainDialogComponent', () => {
  let component: ChainDialogComponent;
  let fixture: ComponentFixture<ChainDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
