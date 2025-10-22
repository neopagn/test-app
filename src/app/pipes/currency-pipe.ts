import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) return 'Không ';
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
    function thousandHandle(val: number): string {
      let tVal = Math.trunc(val % 1000);
      if (tVal === 0) return '';
      val = Math.trunc(val / 1000);
      let hundString = '';
      let tenString = '';
      let oneString = '';
      let ones = Math.trunc(tVal % 10);
      tVal = tVal / 10;
      let tens = Math.trunc(tVal % 10);
      tVal = tVal / 10;
      let hund = Math.trunc(tVal % 10);
      tVal = tVal / 10;

      //xử lí ngữ pháp
      //linh: nếu có số hàng đv, hàng chục =0, và lên bậc trên có nữa.
      //lăm: nếu số hàng chục !0
      //mốt: nếu số hàng chục !1,!0
      //tư: linh tư, hàng chục khác 1. nói cách khác (val||hund) && tens!2
      //MƯỜI-N: từ 10 đến 19 có luật riêng, 20 đến còn lai luật riêng.
      //nếu ones/tens/hund ===0 thì string tương ứng ===''.
      //không trăm: val && ones||tens

      //hund:
      if ((hund === 0 && ones == 0 && tens == 0) || (!hund && !val))
        //trường hợp không hiện không trăm: khi bên trên không còn đv nữa, phải xóa không trăm để đỡ thừa
        // hoặc trường hợp cả 3 số bằng 0 .
        //nếu ones ==0 và tens ==0 thì không có gì, đồng thời ở đơn vị cao hơn còn gt-> nếu mà bọn nó có thì sang else chứ!
        hundString = '';
      else hundString = toNum[hund] + postfix[2];

      //tens:
      if (tens === 1) tenString = 'mười ';
      else if (tens === 0) {
        if ((val || hund) && ones) tenString = 'linh ';
        else tenString = '';
      } else tenString = toNum[tens] + postfix[1];

      //ones:
      if (ones === 5 && tens != 0) oneString = 'lăm ';
      else if (ones === 1 && tens >= 2) oneString = 'mốt ';
      else if (ones === 0) oneString = '';
      else if (ones === 4 && tens != 1 && (val || hund)) oneString = 'tư ';
      else oneString = toNum[ones];

      return hundString + tenString + oneString;
    }

    function billionHandle(val: number): string {
      let res = '';
      let bVal = Math.trunc(val % 1000000000);
      let bac = 0;
      while (bVal) {
        let currentTString = thousandHandle(val);
        bVal = Math.trunc(bVal / 1000);
        val = Math.trunc(val / 1000);

        if (currentTString) {
          currentTString = currentTString + thousands[bac];
        }
        bac++;
        res = currentTString + res;
      }

      return res;
    }

    function mainHandler(val: number): string {
      let res = '';
      let postElem = '';
      while (val) {
        let currentString = billionHandle(val);
        postElem = postElem + thousands[3];
        if (val >= 1000000000) currentString = postElem + currentString;
        res = currentString + res;
        val = Math.trunc(val / 1000000000);
      }

      return res;
    }

    return mainHandler(value);
  }
}
