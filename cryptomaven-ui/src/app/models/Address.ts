import { Coin } from "./Coin";
import { Chain } from "./Chain";


export interface Address { 
    id?:  number;
    description?: string;

    owner?:  string;
    email?:  string;
    address?: string;
    chain?:  string;
    iconUrl?:  string;
    // iconUrl?: {
    //   src?: string;
    //   alt?: string;
    // };
    blockExplorerUrl?:  string;
    ownerId?:  number;
    chainId?: number;
    chains?:  Array<Chain>;
    coins?:  Array<Coin>;
}