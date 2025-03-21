import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainComponent } from './chain.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChainService } from '../../services/chain-service';
import { ActivatedRoute } from '@angular/router';

describe('ChainComponent', () => {
  let component: ChainComponent;
  let fixture: ComponentFixture<ChainComponent>;
  let mockChainService;
  let mockActivatedRoute;

  beforeEach(async () => { 
    mockChainService = jasmine.createSpyObj(['loadChainById', 'loadAllChainAddresses']);
    
    // mockActivatedRoute = jasmine.createSpyObj(['snapshot']);
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => { return 1;}
                }
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ ChainComponent ],
      providers: [
        { provide: ChainService, useValue: mockChainService},
        { provide: ActivatedRoute, useValue: mockActivatedRoute}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

  });



 beforeEach(() => {
    fixture = TestBed.createComponent(ChainComponent);
    component = fixture.componentInstance;

    mockActivatedRoute.snapshot.paramMap.get.and.returnValue(1);
    mockChainService.loadChainById.and.returnValue({pipe: () => {return {}}});
    mockChainService.loadAllChainAddresses.and.returnValue({pipe: () => {return {}}});
     
   })


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy(); 

  });

  it('should create', () => {
    fixture.detectChanges();
    expect(mockChainService.loadChainById).toHaveBeenCalled();
    expect(mockChainService.loadAllChainAddresses).toHaveBeenCalled();
    expect(ActivatedRoute).toHaveBeenCalled();
  });
});
