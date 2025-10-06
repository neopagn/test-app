import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0 ) return 'Không ';
    let res: string = '';
    const postfix: string[] = ['', 'mươi ', 'trăm ', 'nghìn ', 'triệu ', 'tỷ '];
    const thousands: string[] = ['', 'nghìn ', 'triệu ', 'tỷ '];
    const toNum: string[] = [
      'không ',
      'một ',
      'hai ',
      'ba ',
      'bốn ',
      'năm ',
      'sáu ',
      'bảy ',
      'tám ',
      'chín ',
    ];
    //chia ra các phần 1000, mỗi phần sẽ được bóc tách, sau đó thêm postfix của nó.
    //chia ra các khối 1000, mỗi khối 1000 lại được chia 10 để tách từng hàng đơn vị,
    //thành công, nhưng ngữ pháp chưa đúng.
    //ngữ pháp: số hàng đơn vị thêm prefix "linh" nếu số hàng trăm =0;
    // 5: năm, trở thành lăm khi có hàng chục.
    // 1: một, trở thành mốt khi số hàng chục >2
    // hundreds: if hundred = 0 thi hStr = '';


    //


    function tBlockHandle(value: number, continueHandle:boolean): string {
      if (value===0) return '';
      let hStr = '',
        tStr = '',
        oStr = '';
      let ones = Math.trunc(value % 10);
      value = value / 10;
      let tens = Math.trunc(value % 10);
      value = value / 10;
      let hund = Math.trunc(value % 10);
      let res = '';
      // xử lí ngữ pháp
      hStr = toNum[hund] + postfix[2];
      tStr = toNum[tens] + postfix[1];
      oStr = toNum[ones] + postfix[0];

      if (hund === 0 && continueHandle && ones) {
        hStr = hStr + 'linh ';
      }
      else if(hund ===0 && (!continueHandle )) hStr ='';
      if (tens && ones ===  5) oStr = 'lăm ';
      if (tens >1 && ones === 1) oStr = 'mốt ';
      if (tens >1 && ones === 4) oStr = 'tư ';
      if (tens ===1 ) tStr = 'mười ';
      if (tens ===0 ) tStr = '';
      if ( !ones ) oStr = '';



      return hStr + tStr + oStr;
    }
    ///Main function
    let bac = 0;
    while(value>0){
      let currentTBlock = Math.trunc(value%1000);
      value =Math.trunc( value/1000);
      let continueHandle : boolean = !!value;
      let currentTBlockString = tBlockHandle(currentTBlock, continueHandle);
      //thêm hậu tố hàng nghìn, triệu, tỷ, tỷ tỷ.// neu string khong rong thi them
      if(currentTBlockString){
      if(bac<=3){
        currentTBlockString = currentTBlockString + thousands[bac];
      }
      else if(bac>3){
        currentTBlockString = currentTBlockString + thousands[bac-3] + thousands[3];
      }
    }

      bac++;
      // }
      res = currentTBlockString + res;
    }

    return res;
  }
}
