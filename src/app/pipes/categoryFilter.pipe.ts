import {Pipe, PipeTransform} from '@angular/core';
import {SnippetsModel} from "../models/snippets/snippets.model";
import {SnippetService} from "../services/snippet.service";

@Pipe({
  name: 'categoryFilter',
  pure: false
})
export class CategoryFilter implements PipeTransform {


  transform(snippetsArray: Map<string, SnippetsModel> , categoryKey : any): SnippetsModel{
    if (snippetsArray ) {
      for( let id of snippetsArray.keys()){
        if(categoryKey === snippetsArray.get(id).categoryId){
          console.log(snippetsArray.get(id));
          return snippetsArray.get(id);
        }
      }

    }
  }
}

