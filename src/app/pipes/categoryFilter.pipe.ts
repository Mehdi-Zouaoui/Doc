import {Pipe, PipeTransform} from '@angular/core';
import {SnippetsModel} from "../models/snippets/snippets.model";

@Pipe({
  name: 'categoryFilter',
  pure: false
})
export class CategoryFilter implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  }

  // transform(snippetsArray: Map<string, SnippetsModel> , categoryId: string): Map<string, SnippetsModel>{
  //   if (snippetsArray ) {
  //     for( let id of snippetsArray.keys()){
  //       if(categoryId == snippetsArray.get(id).categoryId){
  //         // @ts-ignore
  //         return snippetsArray.get(id);
  //       }
  //     }
  //
  //   }
  // }
}

