import { Component, Input } from '@angular/core';
import { Coin } from 'src/app/models/Coin'; // Replace 'path-to-coin' with the actual path to the Coin type or interface
import { Subject } from 'rxjs';
import {NgFor, NgIf} from '@angular/common';
 
@Component({
  selector: 'app-places-container',
  // standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './places-container.component.html',
  styleUrls: ['./places-container.component.css']
})
export class PlacesContainerComponent {
  @Input()
  description: string;
  userCoins: Coin[] = [];

  isFetching: Subject<boolean> = new Subject<boolean>();
  error: Subject<string> = new Subject<string>();
  private addressService: any;

  ngOnInit() {
    this.coins();
  }
  onSelectCoin(coin: Coin) {
    console.log('coin selected', coin);
    const subscription = this.addressService.editCoinFromUserCoins(coin, "1").subscribe({
      next: (coin) => {
        console.log('coin edited from user coins');
        console.log(coin);
        return coin;
      },
      error: (error) => {
        console.log('error adding coin to user coins');
      }
    });
  } ss
 
  constructor() { }
  coins() {
    this.isFetching.next(true);
    const subscription = this.addressService.loadUserCoins("1", "error from PlacesContainerComponent NgOniti").subscribe(coins => {
      this.isFetching.next(false);
      this.userCoins = coins;
    });
  }

}
