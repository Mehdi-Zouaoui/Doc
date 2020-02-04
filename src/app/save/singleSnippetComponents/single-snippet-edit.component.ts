import {Component,  OnInit} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';

@Component({
  selector: 'app-single-snippet',
  template: '<app-snippet-edit></app-snippet-edit>',
})

export class SingleSnippetEditComponent implements OnInit {
  index = this.snippetService;
  snippets = this.snippetService.snippets;
  title: string;
  body: snippetContentModel[];

  constructor(private snippetService: SnippetService) {}

  ngOnInit() {}
}
