import { Injectable } from "@angular/core";
import { throwError, BehaviorSubject, Observable } from "rxjs";
import { User } from '../../../../../src/app/models/User';
import { Router } from '@angular/router';
import { map, shareReplay, catchError, tap } from 'rxjs/operators'
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Address } from "../../models/Address";

export const AUTH_DATA = "AUTH_DATA";
export const ID_TOKEN = 'idToken'

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
    id?: number;
    addresses?: Address[];
}
@Injectable({
    providedIn: 'root'
})
export class AuthStore {
    setUser(user: GrootAuth) {
        throw new Error('Method not implemented.');
    }
    private uSubject$ = new BehaviorSubject<User>(new User());
    user$: Observable<User> = this.uSubject$.asObservable();
    email: string = localStorage.getItem('email') || '';

    isLoggedIn$: Observable<boolean>
    isLoggedOut$: Observable<boolean>



    constructor(private router: Router, private httpClient: HttpClient) {

        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

        const user = localStorage.getItem(AUTH_DATA);
        if (user) {
            this.uSubject$.next(JSON.parse(user));
        }
    }
    //////////////////////////////   :8080/users/auth/register  //////////////////////////////
    register({ email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string }) {
        localStorage.setItem('email', email);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        return this.httpClient
            .post<GrootAuth>(
                `${environment.nft_url}/users/auth/register`,
                {
                    email: email,
                    password: password,
                    firstName: firstName,
                    lastName: lastName
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    localStorage.setItem('email', resData.email || '');
                    localStorage.setItem('userId', resData.userId || '');
                    localStorage.setItem('token', resData.idToken || '');
                    localStorage.setItem('userType', resData?.userType?.toString() || '');
                    localStorage.setItem('cusUrl', resData?.cusUrl || '');
                    localStorage.setItem('isActive', resData.isActive?.toString() || '');
                    localStorage.setItem('id', resData.id?.toString() || '');


                }),
                tap(resData => {
                    this.executeAuthenticationService(
                        resData.email || '',
                        resData.userId || '', // userId
                        resData.idToken || ''  // String id
                    );
                })
            )
    }


    login(usernameOrEmail: string, password: string): Observable<GrootAuth> {
        localStorage.setItem('email', usernameOrEmail);
        return this.httpClient
            .post<GrootAuth>(
                `${environment.nft_url}/users/auth/login`,
                {
                    usernameOrEmail: usernameOrEmail,
                    password: password,
                    returnSecureToken: true
                })
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.executeAuthenticationService(
                        resData.email || '',
                        resData.localId || '',
                        resData.idToken || ''
                    );
                })
                // tap(user => {
                //     this.uSubject.next(user);
                //     user.password = "********";
                //     localStorage.setItem(AUTH_DATA, JSON.stringify(user));
                // }),
                // shareReplay()
            );
    }

    executeAuthenticationService(
        email: string,
        userId: string,
        token: string
    ) {
        const user = new User();
        user.email = email;
        user.userId = userId;
        user.idToken = token;

        this.uSubject$.next(user);
        user.firstName = localStorage.getItem('firstName') || '';
        user.lastName = localStorage.getItem('lastName') || '';
        localStorage.setItem('AUTH_DATA', JSON.stringify(user));
        localStorage.setItem('idToken', token);
        localStorage.setItem('userId', userId);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
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
        return throwError(errorMessage);
    }
    getEmailId() {
        let email = localStorage.getItem('email');
        return this.email;
    }

    logout() {
        this.uSubject$.next(new User());
        localStorage.removeItem(AUTH_DATA);
    }
    public get currentUserValue(): User {
        console.log(this.uSubject$.value)
        return this.uSubject$.value;
    }
}