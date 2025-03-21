import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Chain} from '../../../../src/app/models/Chain';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import { Address } from '../../../../src/app/models/Address';
import {environment} from '../../../../src/environments/environment';


@Injectable({
    providedIn:'root'
})
export class ChainService {
 

    constructor(private http:HttpClient) {

    }

    loadChainById(chainId:number) {
       return this.http.get<Chain>(`${environment.nft_url}/chains/${chainId}`)
            .pipe(
              shareReplay()
            );
    }

    loadAllChainAddresses(chainId:number): Observable<Address[]> {
        return this.http.get<Address[]>(`${environment.nft_url}/addresses`, {
            params: {
                pageSize: "10000",
                chainId: chainId.toString()
            }
        })
            .pipe(
                // map(res => res["data"]),
                shareReplay()
            );
    }

    loadAllChains(): Observable<Chain[]> {
        return this.http.get<Chain[]>(`${environment.nft_url}/chains`)
            .pipe(
                // map(res => res["data"]),
                map(res => res),
                shareReplay()
            );
    }


    deleteChain(chainId:string):Observable<any> {
        return this.http.delete(`${environment.nft_url}/chains/${chainId}`)
            .pipe(
                shareReplay()
            );
    }

    saveChain(chainId:string, changes: Partial<Chain>):Observable<any> {
        return this.http.put(`${environment.nft_url}/chains/${chainId}`, changes)
            .pipe(
                shareReplay()
            );
    }


    searchAddresses(searchInput:string, searchInput2?:string): Observable<Address[]> {

        searchInput2 = searchInput2 || "";
        return this.http.get<Address[]>(`${environment.nft_url}/addresses`, {
            params: {
                filter: searchInput,
                filter2: searchInput2, //if none provided
                pageSize: "100"
            }
        })
            .pipe(
                map((res: any) => res["data"]),
                shareReplay()
            );
    }


}







