import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {SnippetService} from '../services/snippet.service';
import {snippetContentModel} from '../models/snippets/snippetContent.model';
import {PrismService} from "../services/prism.service";
import Prism from 'prismjs';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styles : ['pre.line-numbers > code{ overflow: visible ; padding : 0 ; color : white;}']
})


export class SnippetsComponent implements OnInit , AfterViewInit {
  @Input() snippetId: number;
  @Input() snippetTitle: string;
  @Input() snippetBody: snippetContentModel[];
  @Input() snippetCategory: number;
  categoryName: string ;
  title: string;
  highlighted: Boolean = false;
  body: snippetContentModel[];
  snippets = this.snippetService.snippets;
  id: number;

  constructor( private snippetService: SnippetService, private prismService: PrismService) {
  }
ngAfterViewInit(): void {
  if (!this.highlighted) {
    this.snippetBody.forEach((item) => {
      if(item.type === 'code') {
        this.prismService.highlightAll();
      }
    });
    this.highlighted = true;
  }
}
  ngOnInit() {
    this.snippetService.modify = false;

    console.log('MODIFY' , this.snippetService.modify);
    console.log('Keys' ,  this.snippets);
    this.categoryName = this.snippetService.getCategoryName(this.snippetCategory);
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
