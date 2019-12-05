import {Injectable, Input} from '@angular/core';
import {SnippetsModel} from '../models/snippets/snippets.model';
import {CategoryModel} from "../models/snippets/category.model";

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  modify: boolean;
  snippets: SnippetsModel[] = [

    new SnippetsModel('Regex', [
      {content: 'test', type: 'text', id: 0, index: 0 },
      {content: 'test2', type: 'text', id: 1, index: 2},
      {content: 'test1', type: 'text', id: 2, index: 1},
    ], 0 , 0),
    new SnippetsModel('Bulles', [
      {content: 'ICI', type: 'text', id: 0, index: 0},
      {content: 'LA', type: 'text', id: 1, index: 2},
      {content: 'T ES OU ', type: 'text', id: 2, index: 1},
      {content: 'Dans ton cul ', type: 'text', id: 2, index: 1},
    ], 1 , 1)
  ];

  categories: CategoryModel[] = [
    new CategoryModel(
      'Animations',
      'animations',
      0
    ),
    new CategoryModel(
      'JS',
      'javascript',
      1),
    new CategoryModel(
      'Filter',
      'filter',
      2)
  ];

  constructor() {
  }

  addSnippet(snippet: SnippetsModel) {
    this.snippets.push(snippet);
    console.log('YO', this.snippets)
  }

  deleteSnippet(id) {
    this.snippets.splice(id, 1);
  }
  getIndex(index){
    console.log('INDEX',index);
    return index;
  }

}



