import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styles: [ 
    `    
.spinner-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.32);
  z-index: 20000;
}



    `
  ]
  })
export class LoaderComponent implements OnInit {

  constructor(public loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
