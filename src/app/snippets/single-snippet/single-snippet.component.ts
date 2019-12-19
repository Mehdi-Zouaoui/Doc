import {Component,  OnInit} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';



@Component({
  selector: 'app-single-snippet',
  template: '<snippet-edit></snippet-edit>',

})
export class SingleSnippetComponent implements OnInit {
  index = this.snippetService.index;
  snippets = this.snippetService.snippets;
  title: string;
  body: snippetContentModel[];

  constructor(private snippetService: SnippetService) {
  }
  ngOnInit() {

  }
}
