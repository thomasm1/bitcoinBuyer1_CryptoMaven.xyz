import { Component } from '@angular/core';

import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";

@Component({
    selector: 'app-new-proto-coin',
    standalone: true,
    templateUrl: './new-proto-coin.component.html',
    styleUrls:[ './new-proto-coin.component.css'],
    imports: [ButtonComponent, ControlComponent]
})
export class NewProtoCoinComponent {

}
` `