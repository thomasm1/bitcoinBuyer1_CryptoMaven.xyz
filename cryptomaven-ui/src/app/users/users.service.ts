import { Injectable } from '@angular/core';

import { DUMMY_USERS } from '../../dummy-users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  
  private users = DUMMY_USERS;

 public getUsers() {
    return this.users;
  }

}
