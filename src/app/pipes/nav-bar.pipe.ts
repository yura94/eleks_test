import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'transformNullToFalse' })
export class NavBarPipe implements PipeTransform {
  transform(value: boolean | null): boolean {
    if (value == null) {
      return  false;
    }
    return value;
  }
}
