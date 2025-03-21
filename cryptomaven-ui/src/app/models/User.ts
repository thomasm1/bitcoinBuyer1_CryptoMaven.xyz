import { Address } from './Address';

export class User {
    
    // idToken?: string;
    userId?:string;
    username?: string;
    lastName?: string;
    firstName?: string; 
    email?: string;  
    cusUrl?: string; 
    userGroup?: string;
    isActive?: number; // 0 = inactive, 1 = active 
    id?: number;
    addresses?: Address[];  
    
    memberSince?: string;
    avatar?: string; 
    tokenId?: string;  
    // getIdToken: () => string = () => {
    //     return this.idToken || ''; 
    // }
  

}
