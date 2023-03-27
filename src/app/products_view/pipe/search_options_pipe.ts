import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'searchOptions'})
export class SearchOptionsPipe implements PipeTransform {
  transform(options: string[], searchValue: string | undefined): string[] {
    if (!options || !searchValue) {
      return options;
    }

    return options.filter(
      (cv: string) => cv.toLowerCase().indexOf(searchValue.toLowerCase()) !==
                      -1);
  }
}
