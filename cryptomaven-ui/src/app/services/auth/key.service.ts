import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, throwError } from "rxjs"; 

@Injectable({
  providedIn: 'root'
})
export class KeyService { 
  private rinkebyUrl = environment.rinkebyUrl;
  moralisApi:string =  `${environment.cle_url}/getMoralisApi`;
  moralisKey:string = "";


  constructor(
    private http: HttpClient
  ) {  
    
}
   
  getMoralisKey() {
    this.http.get(`${this.moralisApi}`)
    .subscribe((data:any) => {
      if(data["MORALIS_API_KEY"] != undefined){
        this.moralisKey = data["MORALIS_API_KEY"][0];
      }
      });
      return this.moralisKey;
  } 

  // getRinkebyApi() {
  //   return this.http.get(this.moralisApi)
  //   .subscribe((data:any) => {
  //     if(data["MORALIS_API_KEY"] != undefined){
  //       new Promise<void>((resolve, reject) => {
  //         let script: HTMLScriptElement = document.createElement('script');
  //         script.addEventListener('load', () =>  resolve());
  //         script.src = `${this.rinkebyUrl}/js?key=${data["MORALIS_API_KEY"][0]}`; /// TODO FIX THIS
  //         document.head.appendChild(script);
  //     console.log(data);
  //     })
  //  }
  //  });
  // }
  // error handler
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error(
        "Client-side Error getting customers: ",
        errorResponse.error.message
      );
    } else {
      console.error("Server Side Error: ", errorResponse);
    }
    return throwError(() => new Error(`"Oops, there is a problem  .."`));
  }
  

}
