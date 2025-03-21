import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject, throwError, timer } from 'rxjs';

import { catchError, delayWhen, filter, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';
import { createHttpObservable } from '../../../../src/app/utility/observable';
import { Chain } from '../../../../src/app/models/Chain';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../layout/loader/loader.service';
@Injectable({
    providedIn: 'root'
})


export class ChainStore {

    private subjectChain = new BehaviorSubject<Chain[]>([]);

    chains$: Observable<Chain[]> = this.subjectChain.asObservable();

    constructor(
        private httpClient: HttpClient,
        private loaderService: LoaderService,

    ) {
        // this.init();
        this.loadAllChains();
    }

    private loadAllChains() {
        const loadChains$ = this.httpClient.get<Chain[]>(`${environment.nft_url}/chains`)
            .pipe(
                // map(res => res['data']), 
                map(res => res),
                catchError(err => {
                    console.log('error in source. Details: ' + err);
                    return throwError(() => 'error in source. Details: ' + err);
                }),
                tap(chains => this.subjectChain.next(chains)),
            )
        this.loaderService.showLoaderUntilCompleted(loadChains$).subscribe();
    }

    selectAllChains() {  
        return this.noFilter();
    }
    
    selectPulsechainChains() {
        return this.filterByChainName('pulsechain'.toUpperCase());
    }
    selectEthereumChains() {
        return this.filterByChainName('ethereum'.toUpperCase());
    }

    selectPolygonChains() {
        return this.filterByChainName('polygon'.toUpperCase());
    }

    selectChainById(chainId: number) {
        return this.chains$
            .pipe(
                map(chains => chains.find(chain => chain && +chain.id == chainId)),
                filter(chain => !!chain)

            );
    }
    noFilter() {
        return this.chains$;
    }
 

    saveChain(chainId: number, change: Partial<Chain>): Observable<any> {

       if(chainId==-1) {
        console.log(chainId);  
        return this.httpClient.post(`${environment.nft_url}/chains`, change)
            .pipe(
                catchError(err => {
                    return throwError(() => 'error in source. Details: ' + err);
                }),
                shareReplay()
            )

       } else {
        const chains = this.subjectChain.getValue();

        const chainIndex = chains.findIndex(chain => chain && chain.id !== undefined && +chain.id == chainId); 
        const newChain: Chain = {
            ...chains[chainIndex],
            ...change
        };

        const newChains: Chain[] = chains.slice(0);
        newChains[chainIndex] = newChain;

        this.subjectChain.next(newChains);  
        return this.httpClient.put(`${environment.nft_url}/chains `, change)
            .pipe(
                catchError(err => { 
                    return throwError(() => 'error in source. Details: ' + err);
                }),
                shareReplay()
        // return from(fetch(`/chains/${chainId}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(changes),
        //     headers: {
        //         'content-type': 'application/json'
        //     }
        // }));
            )
       }
    }

    filterByChainName(searchTerm: string): Observable<Chain[]> {
        return this.chains$
        .pipe(
            map(chains => 
                chains.filter(chain => chain.name?.toUpperCase() == searchTerm.toUpperCase()) 
            )) 
            }
  
    init() {
        const baseUrl = environment.nft_url;
        const http$ = createHttpObservable(`${baseUrl}/chains`);
        console.log(this.chains$.subscribe())
        http$
            .pipe(
            tap(() => console.log('HTTP request executed')),
            // map(res => Object.values(res['data']))
            )
            .subscribe((chains: Chain[]) => this.subjectChain.next(chains));
    }


}


