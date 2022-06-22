import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jenjang'
})
export class JenjangPipe implements PipeTransform {

  transform(value: number): string {
    let result;
    if (value < 100) {
      result = 'Terampil';
    } else  if (value >= 100 && value < 150) {
      result = 'Mahir';
    } else if (value >= 150){
      result = 'Penyelia';
    }
    return result;
  }

}
