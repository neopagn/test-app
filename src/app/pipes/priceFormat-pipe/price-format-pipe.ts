import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number): string {
    let valueString:string = value.toString();
    let res:string = '';
    let i = valueString.length;
    if (i<=3) return value.toString();
    while(i>3){
      i-=3;
      res = ','+valueString.slice(i,i+3)+res;
    }
    //i=1,2,3
    res = valueString.slice(0,i) + res;

    return res;
  }

}
