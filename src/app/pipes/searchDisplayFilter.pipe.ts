import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchDisplayFilter'
})
export class SearchDisplayFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

    return items.filter(it => {

      return it.sanitizeTitle.toLocaleLowerCase().includes(searchText);
    });
  }
}
