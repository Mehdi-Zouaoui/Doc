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
    searchText = searchText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('_').toLocaleLowerCase();

    let results = items.filter(it => {
      return it.key.includes(searchText);
    });

    console.log(results);

    return results;
  }
}
