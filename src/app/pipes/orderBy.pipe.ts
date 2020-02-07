import {Pipe, PipeTransform} from '@angular/core';
import {SnippetsModel} from '../models/snippets/snippets.model';

@Pipe({name: 'orderBy', pure: false})
export class OrderBy implements PipeTransform {



  transform(array:any[]): any {
  }

}
