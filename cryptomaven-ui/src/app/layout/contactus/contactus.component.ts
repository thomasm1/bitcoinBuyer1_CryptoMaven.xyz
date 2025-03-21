import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  phone :string = "505-508-7707";
  email :string = "tmaestas@armchairbitcoinist.com";
  address :string = "500 Koehler Dr., Morgantown 26505 ";

}
