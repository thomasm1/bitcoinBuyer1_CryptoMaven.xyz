
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchAddressesComponent } from './search-addresses.component';
import { ChainService } from '../../services/chain-service'; 
import { of } from 'rxjs';
import { Address } from 'src/app/models/Address';

describe('SearchAddressesComponent', () => {
  let component: SearchAddressesComponent;
  let fixture: ComponentFixture<SearchAddressesComponent>;
  let chainService: ChainService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAddressesComponent ],
      providers: [ ChainService ]  
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAddressesComponent);
    component = fixture.componentInstance;
    chainService = TestBed.inject(ChainService);  
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search results', () => {
    expect(component.searchResults$).toBeUndefined();
  });

  it('should call onSearch method with empty string on component initialization', () => {
    spyOn(component, 'onSearch');
    component.ngOnInit();
    expect(component.onSearch).toHaveBeenCalledWith('');
  });

  it('should set searchResults$ with the result of chainService.searchAddresses', fakeAsync(() => {
    const input = 'input';
    const input2 = 'input2';
    const mockSearchResults = of([{} as Address]);  
    spyOn(chainService, 'searchAddresses').and.returnValue(mockSearchResults);
    component.onSearch(input + ',' + input2);
    tick();
    component.searchResults$.subscribe(results => {
      expect(results).toEqual([{
        
      } as Address]);
    });
    expect(chainService.searchAddresses).toHaveBeenCalledWith(input, input2);
  }));

  it('should set activeAddress when openAddress method is called', () => {
    const mockAddress = {} as Address;
    component.openAddress(mockAddress);
    expect(component.activeAddress).toEqual(mockAddress);
  });

  it('should set activeAddress to null when onBackToSearch method is called', () => {
    component.onBackToSearch();
    expect(component.activeAddress).toBeNull();
  });
});