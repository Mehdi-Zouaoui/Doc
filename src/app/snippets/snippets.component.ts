import {Component, Input, OnInit} from '@angular/core';
import {SnippetService} from '../services/snippet.service';
import {snippetContentModel} from '../models/snippets/snippetContent.model';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html'
})



export class SnippetsComponent implements OnInit {
  @Input() snippetId: number;
  @Input() snippetTitle: string;
  @Input() snippetBody: snippetContentModel[];
  @Input() index: number;
  title: string;
  body: snippetContentModel[];
  snippets = this.snippetService.snippets;
  id: number;

  constructor(private snippetService: SnippetService ) {
  }

  ngOnInit() {
    this.snippetService.modify = false;
    console.log('MODIFY' , this.snippetService.modify);
  }


  onDelete(index: number) {

    this.snippetService.deleteSnippet(index);
  }
 onModify(index: number) {

   this.snippetService.getIndex(index);
}




}
