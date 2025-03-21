// import { API_URL } from './../app.constants';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { User } from '../../models/User';
import { Address } from '../../models/Address';
export const ID_TOKEN = 'idToken'
export const ROLE_ADMIN = 'ROLE_ADMIN' // extra auth to be JWT
export const AUTH_DATA = 'AUTH_DATA'


// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
export interface FireBaseAuthResponseData {
  kind?: string;
  idToken?: string;
  email?: string;
  refreshToken?: string;
  expiresIn?: string;
  localId?: string;
  registered?: boolean;

}
/*
*displayName  email :  "thomas1.maestas@gmail.com"
expiresIn :  "3600"
idToken :  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOTczZWUwZTE2ZjdlZWY0ZjkyMWQ1MGRjNjFkNzBiMmVmZWZjMTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZnJpZW5kcy1vZi1ncm9vdCIsImF1ZCI6ImZyaWVuZHMtb2YtZ3Jvb3QiLCJhdXRoX3RpbWUiOjE2NzkyNjUxNjksInVzZXJfaWQiOiJKU2pzNzFLWGtvT0ZBSWN2YkVEUDN0Q0JjZDcyIiwic3ViIjoiSlNqczcxS1hrb09GQUljdmJFRFAzdENCY2Q3MiIsImlhdCI6MTY3OTI2NTE2OSwiZXhwIjoxNjc5MjY4NzY5LCJlbWFpbCI6InRob21hc20xLm1hZXN0YXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRob21hc20xLm1hZXN0YXNAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.swtfv1IyLhqWPh_sVTlQUy09PGYnn9vtObttPhq0ts31pmC_UUsXPI0ROu6U988FN3Zfcudwia9NBXMUImNy2oXrQspocRXhdkhX2joKLejwA3IBw-Wv4roZvt7NJjbslzbcfJZBhQG_R5C4zwXAPSeq52Bkte81DqKQeZeJ5vONEKvyTdRCLIhm6ajkV2PlpheG4XXXelaBQSgKdkroSkA7h4m7BDFpm66UboXa1TCpSBY1G4dupauxL_i0sWa39twOpADWfKYKzSI8btL1ihFcILlKAetX_BupSLUpwQZqW9cxRHcHsfBYQJJblo2NLwcmv_eorWE1tM-7MtEfmA"
kind :  "identitytoolkit#VerifyPasswordResponse"
localId :  "JSjs71KXkoOFAIcvbEDP3tCBcd72"
refreshToken :  "APJWN8dCHcFTdGRJIUVrhr3i8qlPYpAI_NGKATFhoI42AOEJXcMaGJl8rJk6G66kbIqTH-OnlLtbKfblDbQXFIi4twZAJ_NQzOnjCr9RNt8EpduUySu7b_s8dcQSZCTLwr54Xni_BlJEau4Q82OZ6A--cWQXcSzWLs6YgVJ9nZdn09RPaguFbpZLXL_O-qpxd840ndCSQmcrG7aj6kdARSTttnIenmHG-b5DHFL6fUF1HxTxpzDv9nc"
registered :  true
*/
export interface GrootAuth extends FireBaseAuthResponseData {
  idToken?: string;
  userId?: string;
  username: string;
  lastName?: string;
  firstName?: string; 
  userType?: number;
  email?: string;
  phone?: string;
  cusUrl?: string;  
  isActive?: number; // 0 = inactive, 1 = active
  groupType?: string;
  id?: number;
  addresses?: Address[];
}
@Injectable({ providedIn: 'root'
})
export class  AuthFirebaseStoreService { 
  
  baseUrl: string;
  private uAdminSubject$ = new BehaviorSubject<User>(new User());
  adminUser$: Observable<User> = this.uAdminSubject$.asObservable();
  isAdminLoggedIn$: Observable<boolean>
  isAdminLoggedOut$: Observable<boolean>

  constructor(private http: HttpClient, private router: Router) {
    this.baseUrl = environment.nft_url;

    this.isAdminLoggedIn$ = this.adminUser$.pipe(map(user => !!user));
    this.isAdminLoggedOut$ = this.isAdminLoggedIn$.pipe(map(loggedIn => !loggedIn));

  }

  //////////////////////////////   FIREBASE_GROOT   
  registerFirebase({ email, password }: { email: string; password: string }) {
    return this.http
      .post<FireBaseAuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${environment.FIREBASE_GROOT} `,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.executeAuthenticationService(
            resData.email || '',
            resData.localId || '', // userId
            resData.idToken  || '' // String id
          );
        })
      )
  }
  //////////////////////////////   8080/users/login  //////////////////////////////
  login(usernameOrEmail: string, password: string) {
    return this.http
      .post<GrootAuth>(
        `${environment.nft_url}/users/auth/login`,
        {
          usernameOrEmail: usernameOrEmail,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          localStorage.setItem('email', resData.email || '');
          localStorage.setItem('userId', resData.userId || '');
          localStorage.setItem('token', resData.idToken || '');
        }),
        tap(resData => {
          this.executeAuthenticationService(
            resData.email || '',
            resData.userId || '',
            resData.idToken || ''
          );
        })
      );
  }

  //////////////////////////////   FIREBASE_GROOT   
  loginFirebase(usernameOrEmail: string, password: string) {
    return this.http
      .post<FireBaseAuthResponseData>(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${environment.FIREBASE_GROOT}`,
        {
          email: usernameOrEmail,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          localStorage.setItem('email', resData.email || '');
          localStorage.setItem('token', resData.idToken || '');
        }),
        tap(resData => {
          this.executeAuthenticationService(
            resData.email || '',
            resData.localId || '',
            resData.idToken || ''
          );
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => console.log(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(() => console.log(errorMessage));
  }

  executeAuthenticationService(
    email: string,
    userId: string,
    token: string
  ) {
    const user = new User();
    user.email = email;
    user.userId = userId;
    user.tokenId = token;

    this.uAdminSubject$.next(user);
    localStorage.setItem('ROLE_ADMIN', JSON.stringify(user));
    localStorage.setItem('ROLE_USER', JSON.stringify(user)); 
  }

  // executeAuthJwtService(username, password) {
  //   return this.http.post<any>(
  //       `${this.baseUrl}/authenticate`,{
  //         username,
  //         password
  //       }).pipe(
  //         map(
  //           data => {
  //             localStorage.setItem(AUTHENTICATED_USER, username);
  //             localStorage.setItem(TOKEN, `Bearer ${data.token}`);
  //             return data;
  //           }
  //         )
  //       ); 
  // }

  getAuthenticatedUser() {
    return localStorage.getItem(ROLE_ADMIN)
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser())
      return localStorage.getItem(ID_TOKEN)
    else
      return null;
  }
  // not for authing in/out, but for admin privileges
  isAdminLoggedIn() {
    let user = localStorage.getItem(ROLE_ADMIN)
    return !(user === null)
  }

  // not for authing in/out, but for admin privileges
  isAdminLoggedOut() {
    let user = localStorage.getItem(ROLE_ADMIN)
    return (user === null)
  }
  logout() {
    this.uAdminSubject$.next(new User());
    this.router.navigate(['/']);
    localStorage.removeItem('ROLE_USER')
    localStorage.removeItem('ROLE_ADMIN')
    localStorage.removeItem(ID_TOKEN)
  }
}

