import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../../models/User';
import { catchError, map } from 'rxjs/operators';
import { environment } from  '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  email: string = "";
  nft_url:string; 
  constructor(private httpService: HttpClient ) {  
    this.nft_url = environment.nft_url; 
 } 
 
    register(user: User) {
      console.log("user "+`${this.nft_url}/users/register`, user);
      this.httpService.post(`${this.nft_url}/users/register`, user); 
      
    }

    // delete(id: string) {
    //     return this.httpService.delete(`${this.nft_url}/users/${id}`);
    // }
    getUser(email: string): Observable<User> {
      this.email = email || localStorage.getItem('email') || ''; 
          return this.httpService.get<User>(`${this.nft_url}/users/email/${this.email}`);
  
  }
  // public getUser(id: number): Observable<User> {
  //   return this.httpService.get<User>(`http://${this.baseUrl}/users/${id}`).pipe(
  //     map(data => new User().deserialize(data)),
  //     catchError(() => throwError('Oops! Member not found ...'))
  //   );
  // }
   getAllUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(`${this.nft_url}/users`)
    // .pipe(
    //   map(data => data["data"])
    // );
   }

   getAllUserChains(): Observable<User[]> {
    return this.httpService.get<User[]>(`${this.nft_url}/users`)
    // .pipe(
    //   map(data => data["data"])
    // );
  }
   
  // public getAllUsers(): Observable<User[]> {
  //   return this.httpService.get<User[]>(`http://${this.baseUrl}/users`).pipe(
  //     map(data => data.map(data => new User().deserialize(data)))
  //   );
  // }

}
