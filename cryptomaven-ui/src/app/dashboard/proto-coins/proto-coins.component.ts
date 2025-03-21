import { Component } from '@angular/core';
import { NewProtoCoinComponent } from "./new-proto-coin/new-proto-coin.component";

@Component({
    selector: 'app-proto-coins',
    standalone: true,
    templateUrl: './proto-coins.component.html',
    styleUrls: ['./proto-coins.component.css'],
    imports: [NewProtoCoinComponent]
})
export class ProtoCoinsComponent {

}
