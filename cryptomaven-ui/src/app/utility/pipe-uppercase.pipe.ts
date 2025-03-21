import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
@Pipe({
  name: 'pipeUppercase'
})
export class PipeUppercase implements PipeTransform {
  
  constructor(private upperCasePipe: UpperCasePipe) {}

  transform(value:any, ...args: any[]): any {
    if (typeof value == 'string') { 
      return this.upperCasePipe.transform(value);
    }
    return value;
  }
}
