import {Component, OnInit} from '@angular/core';
import {SnippetService} from '../services/snippet.service';


@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html'
})


export class SnippetsComponent implements OnInit {
  body =
  [{
    content:'',
    type: 'number'
  }];
  snippets = this.getSnippets();

  constructor(private snippetService: SnippetService) {
  }

  ngOnInit() {
    this.getSnippets();
  }

  getSnippets() {
    return this.snippetService.snippets;
  }

  onDelete(i: number) {
    this.snippetService.deleteSnippet(i);
  }



}
