import { Component } from '@angular/core';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrls:[ './server-status.component.css']
})
export class ServerStatusComponent {
  chainConnection = 'online';

  constructor() { }


  
}
