


import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Address} from "../models/Address";
import {Observable} from "rxjs";
import {NftsService} from "./nfts.service";


@Injectable() 
export class AddressResolver implements Resolve<Address> {

    constructor(private nftsService:NftsService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Address> {
        return this.nftsService.findAddressById(route.params['id']);
    }

}

