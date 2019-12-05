import {Component, Input, OnInit} from '@angular/core';
import {SnippetService} from '../services/snippet.service';
import {Router} from '@angular/router';
import {snippetContentModel} from "../models/snippets/snippetContent.model";

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html'
})



export class SnippetsComponent implements OnInit {
  @Input() snippetIndex:number;
  @Input() snippetTitle:string;
  @Input() snippetBody:snippetContentModel[];
  body =
  [{
    content:'',
    type: 'number'
  }];
  snippets = this.getSnippets();
  constructor(private snippetService: SnippetService ,  private router:Router) {
  }

  ngOnInit() {
    this.getSnippets();
  }

  getSnippets() {
    console.log('SNIPSNIP' , this.snippetService.snippets);
    return this.snippetService.snippets;
  }

  onDelete(index: number) {

    this.snippetService.deleteSnippet(index);
  }
 onModify(index){
  this.snippetService.getIndex(index);

}



}
