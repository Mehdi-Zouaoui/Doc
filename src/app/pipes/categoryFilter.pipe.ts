import {Pipe, PipeTransform} from '@angular/core';
import {SnippetsModel} from "../models/snippets/snippets.model";

@Pipe({
  name: 'categoryFilter',
  pure: false
})
export class CategoryFilter implements PipeTransform {


  transform(snippetsArray: Map<string, SnippetsModel>): any{
    // if (snippetsArray ) {
    //   for( let id of snippetsArray.keys()){
    //     if(categoryId == snippetsArray.get(id).categoryId){
    //
    //       return snippetsArray.get(id);
    //     }
    //   }
    //
    // }
  }
}

