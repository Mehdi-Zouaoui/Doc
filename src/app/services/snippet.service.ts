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
  categoryId: number;
  categoryIndex: number;
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
      {
        content: `
        ngAfterViewInit(): void {
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
    ], 1, 0),
    new SnippetsModel('Bulles', [
      {content: 'ICI', type: 'text', id: 0, index: 0},
      {content: 'LA', type: 'text', id: 1, index: 2},
      {content: 'T ES OU ', type: 'text', id: 2, index: 1},
      {
        content: `
        @Input() snippetId:number;
        @Input() snippetTitle: string; 
        @Input() snippetBody: snippetContentModel[];  
        @Input() index: number;
        title: string;
        highlighted: Boolean = false;
        body: snippetContentModel[]" 
        snippets = this.snippetService.snippets;id: number; `
        , type: 'code', id: 3, index: 3
      },
    ], 2, 1)
  ];

  categories: CategoryModel[] = [
    new CategoryModel(
      'Animations',
      'animations',
      1
    ),
    new CategoryModel(
      'JS',
      'javascript',
      2),
    new CategoryModel(
      'Filter',
      'filter',
      3)
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

  getSnippets(): SnippetsModel[] {
    return this.snippets;
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



