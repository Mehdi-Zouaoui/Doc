import {Injectable, Input} from '@angular/core';
import {SnippetsModel} from '../models/snippets/snippets.model';
import {CategoryModel} from '../models/snippets/category.model';
import {FormGroup} from '@angular/forms';
import {snippetContentModel} from '../models/snippets/snippetContent.model';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  modify: boolean;
  index: number;
  snippetForm: FormGroup;
  contentModel: snippetContentModel[] = [
    new snippetContentModel('text ', 'text', 0, 2),
    new snippetContentModel('code ', 'text', 1, 0),
    new snippetContentModel('description ', 'text', 2, 1)
  ];
  snippets: SnippetsModel[] = [
    new SnippetsModel('Regex', [
      {content: 'test', type: 'text', id: 0, index: 0},
      {content: 'test2', type: 'text', id: 1, index: 2},
      {content: 'test1', type: 'text', id: 2, index: 1},
    ], 0, 0),
    new SnippetsModel('Bulles', [
      {content: 'ICI', type: 'text', id: 0, index: 0},
      {content: 'LA', type: 'text', id: 1, index: 2},
      {content: 'T ES OU ', type: 'text', id: 2, index: 1},
      {content: 'Dans ton cul ', type: 'text', id: 3, index: 3},
    ], 1, 1)
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
    console.log('YO', this.snippets);
  }

  deleteSnippet(id) {
    this.snippets.splice(id, 1);
  }

  loadSnippet(snippetForm: FormGroup, index: number): void {
    snippetForm.setValue({
      title: this.snippets[index].title,
      body: this.snippets[index].body
    });
  }

  getIndex(index: number) {
    this.modify = true;
    console.log('INDEX', index);
    this.index = index;
    return index;
  }

  getSnippetByIndex(id: number) {
    const snippet = this.snippets.find(
      (item) => {
        console.log('id', item.id, id);
        return item.id === id;
      }
    );

    return snippet;
  }


}



