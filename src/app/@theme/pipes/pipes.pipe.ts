import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'repairDate',
  pure: false
})

@Injectable()
export class RepairDatePipe implements PipeTransform {
  transform(value): any {
    if (!value) {
      return value;
    }
    value = value.split('.')[0].replace(/\-/g, '/');
    return value;
  }
}
