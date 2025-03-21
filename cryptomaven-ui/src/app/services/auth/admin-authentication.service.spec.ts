import { TestBed } from '@angular/core/testing';

import { AuthFirebaseStoreService } from './auth-firebase-store.service';

describe('AuthFirebaseStoreService', () => {
  let service: AuthFirebaseStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthFirebaseStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
