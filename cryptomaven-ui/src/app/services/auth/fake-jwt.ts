import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users') || '{}') || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrapped in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // **!! calls materialize and dematerialize to ensure delay even if an error is thrown
                                // (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/api/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/api/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/api/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/api\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { email, password } = body;
            const user = users.find((x: { email: any; password: any; }) => x.email === email && x.password === password);
            if (!user) return error('Username email or password is incorrect');
            return ok({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                idToken: 'fake-jwt-idToken'
            })
        }

        function register() {
            const user = body

            if (users.find((x: { email: any; }) => x.email === user.email)) {
                return error('Username email "' + user.email + '" is already registered')
            }

            user.id = users.length ? Math.max(...users.map((x: { id: any; }) => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter((x: { id: number; }) => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?: { id: any; email: any; firstName: any; lastName: any; idToken: string; } | undefined) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message: string) {
            return throwError(() => { error: { message } });
        }

        function unauthorized() {
            return throwError(()  => { error: { onmessage } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-idToken';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // tempbackend in place of Http service if the json-server & h2-backend not running
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};