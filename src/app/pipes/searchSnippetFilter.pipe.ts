import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchSnippetFilter'
})
export class SearchSnippetFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
    return items.filter(it => {
      return String(it.value.sanitizeTitle).toLocaleLowerCase().includes(searchText);
    });
  }
}
