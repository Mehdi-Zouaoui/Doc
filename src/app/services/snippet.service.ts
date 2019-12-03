import {Injectable, Input} from '@angular/core';
import {SnippetsModel} from "../models/snippets.model";
import {Subject} from "rxjs";
import {snippetContentModel} from "../models/snippetContent.model";

import {SnippetsComponent} from "../snippets/snippets.component";

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  // constructor(public content:string , public type:string , public id:number, public index:number)

  snippets: SnippetsModel[] = [
    new SnippetsModel('Regex', [
      {content: "test", type: "text", id: 0, index: 0},
      {content: "test2", type: "text", id: 1, index: 2},
      {content: "test1", type: "text", id: 2, index: 1},
    ])];

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



