import {Pipe, PipeTransform} from '@angular/core';
import {SnippetsModel} from "../models/snippets/snippets.model";
import {SnippetService} from "../services/snippet.service";

@Pipe({
  name: 'categoryFilter',
  pure: false
})
export class CategoryFilter implements PipeTransform {

  transform(snippetsMap: Map<string, SnippetsModel>, categoryKey: any): SnippetsModel[] {
    for (const id of snippetsMap.keys()) {
      if (categoryKey === snippetsMap.get(id).categoryId) {
        console.log(snippetsMap.get(id));
        return Array(snippetsMap.get(id));
      }
    }
  }
}
    // return Array.from(snippetsMap.values()).filter(snippet => snippet.categoryId == categoryKey);


//   transform(snippetsArray: Map<string, SnippetsModel> , categoryKey : any): SnippetsModel | undefined {
//     if (snippetsArray ) {
//       for( let id of snippetsArray.keys()){
//         if(categoryKey === snippetsArray.get(id).categoryId){
//           console.log(snippetsArray.get(id));
//           return snippetsArray.get(id);
//         }
//       }
//
//     }
//     return null ;



