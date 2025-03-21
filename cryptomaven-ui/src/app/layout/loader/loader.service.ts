import { Injectable } from '@angular/core';
import { BehaviorSubject, concatMap, finalize, Observable, of, tap } from 'rxjs';

@Injectable()
export class LoaderService {

  private loadingSubject = new BehaviorSubject<boolean>(false); // observable for emitting, not for subscribing

  loadingState$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() { 
    console.log("loading service");
  }
 
  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
   return of(null).pipe(
    tap(() => this.loadingOn()),
    concatMap(() => obs$),
    finalize(() => this.loadingOff())
  )
}

  loadingOn(): void {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }

}