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
  title: string;
  body: snippetContentModel[];
  snippets = this.snippetService.snippets;
  id: number;

  constructor(private snippetService: SnippetService ) {
  }

  ngOnInit() {
    this.snippetService.modify = false;
    console.log('MODIFY' , this.snippetService.modify);
    console.log('Keys' ,  this.snippets);
  }
//Changer les index par id
  // Jamais utiliser un index pour identifier un objet

  onDelete(key: number) {
    this.snippetService.deleteSnippet(key);
  }
 onModify(key) {
    this.snippetService.modify = true;
   this.snippetService.snippets.get(key)
}




}
