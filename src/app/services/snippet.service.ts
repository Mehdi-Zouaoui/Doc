import {Injectable, Input} from '@angular/core';
import {SnippetsModel} from '../models/snippets/snippets.model';
import {CategoryModel} from "../models/snippets/category.model";

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  snippets: SnippetsModel[] = [
    new SnippetsModel('Regex', [
      {content: 'test', type: 'text', id: 0, index: 0},
      {content: 'test2', type: 'text', id: 1, index: 2},
      {content: 'test1', type: 'text', id: 2, index: 1},
    ])];
  categories: CategoryModel[] = [
    new CategoryModel(
      'Animations',
      'animations',
      0
    ),
    new CategoryModel('JS',
      'javascript',
      1),
    new CategoryModel('Filter',
      'filter',
      2)
  ];

  constructor() {
  }

  addSnippet(snippet: SnippetsModel) {
    this.snippets.push(snippet);
    console.log('YO', this.snippets)
  }

  deleteSnippet(i: number) {
    this.snippets.splice(i, 1);
  }

  modifySnippet(snippet: SnippetsModel) {

  }
}



