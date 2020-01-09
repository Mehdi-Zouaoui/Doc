import {Injectable} from '@angular/core';
import {SnippetsModel} from '../models/snippets/snippets.model';
import {CategoryModel} from '../models/snippets/category.model';
import {FormGroup} from '@angular/forms';
import {snippetContentModel} from '../models/snippets/snippetContent.model';
import {CategoryFilter} from "../pipes/categoryFilter.pipe";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  modify: boolean;
  index: number;
  categoryId: number;
  snippetRef = firebase.database().ref('snippets');
  contentModel: snippetContentModel[] = [
    new snippetContentModel('text ', 'text', 0, 2),
    new snippetContentModel('code ', 'text', 1, 0),
    new snippetContentModel('description ', 'text', 2, 1)
  ];
  snippets: Map<string, SnippetsModel> = new Map([['1',
    new SnippetsModel('Regex', [
      {content: 'test', type: 'text', id: 0, index: 0},
      {content: 'test2', type: 'text', id: 1, index: 2},
      {content: 'test1', type: 'text', id: 2, index: 1},
    ], 1)], ['2',
    new SnippetsModel('Bulles', [
      {content: 'ICI', type: 'text', id: 0, index: 0},
      {content: 'LA', type: 'text', id: 1, index: 2},
      {
        content: `ngAfterViewInit(): void {
  if (!this.highlighted) {
    this.snippetBody.forEach((item) => {
      if(item.type === 'code') {
        this.prismService.highlightAll();
      }
    });
    this.highlighted = true;
  }
}`, type: 'code', id: 2, index: 1
      },
    ], 2)]
  ]);
  categories: Map<number, CategoryModel> = new Map([[1,
    new CategoryModel(
      'Animations',
      'animations',
      1
    )], [2,
    new CategoryModel(
      'JS',
      'javascript',
      2),
  ], [3,
    new CategoryModel(
      'Filter',
      'filter',
      3)]
  ]);


  constructor() {

  }

  addSnippet(snippet: SnippetsModel) {
    this.snippets.set(String(this.snippets.size + 1), snippet);
    console.log('YO', this.snippets);
  }

  deleteSnippet(key) {
    this.snippets.delete(key);
    firebase.database().ref('snippets').child(key).remove();
  }

  getCategoryName(id: number): string {
    return this.categories.get(id).name;
  }
  getData() {
      firebase.database().ref('snippets')
        .on('value', (data: DataSnapshot) => {
            this.snippetRef = data.val() ? data.val() : [];
          }
        );
      console.log('snippetRef', this.snippetRef);
    // firebase.database().ref('snippets').once('value').then((snapshot) => {
    //   console.log(snapshot.val() , 'KEYS', snapshot.key);
    // });
  }
  pushDatabase(snippetMap: Map<string, SnippetsModel>) {
    snippetMap.forEach((item) => {
      firebase.database().ref('snippets/').push({
        title: item.title,
        body: item.body,
        category: this.getCategoryName(item.categoryId)
      });
    });
  }
}





// loadSnippet(snippetForm: FormGroup, index: number): void {
//   snippetForm.setValue({
//     title: this.snippets[index].title,
//     body: this.snippets[index].body
//   });
// }



