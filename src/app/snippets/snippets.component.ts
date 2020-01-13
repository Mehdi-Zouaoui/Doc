import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {SnippetService} from '../services/snippet.service';
import {snippetContentModel} from '../models/snippets/snippetContent.model';
import {PrismService} from "../services/prism.service";
import Prism from 'prismjs';
import {ActivatedRoute} from "@angular/router";
import {CategoryModel} from "../models/snippets/category.model";

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styles: ['pre.line-numbers > code{ overflow: visible ; padding : 0 ; color : white;}']
})


export class SnippetsComponent implements OnInit, AfterViewInit {
  @Input() snippetId: number;
  @Input() snippetTitle: string;
  @Input() snippetBody: snippetContentModel[];
  @Input() snippetCategory: Map<any,CategoryModel>;
  categoryNames: string |Array<string>;
  title: string;
  highlighted: Boolean = false;
  @Input() categoryKey: any;
  snippets = this.snippetService.snippets;
  id: number;



  constructor(private snippetService: SnippetService, private prismService: PrismService, private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    if (!this.highlighted) {
      this.snippetBody.forEach((item) => {
        if (item.type === 'code') {
          this.prismService.highlightAll();
        }
      });
      this.highlighted = true;
    }
  }

  ngOnInit() {
    this.snippetService.modify = false;
    this.categoryKey = this.route.snapshot.paramMap.get('categoryId');
    console.log('Content', this.snippetService.snippets.values());
    console.log('MODIFY', this.snippetService.modify);
    console.log('Keys', this.snippets);

   this.categoryNames = this.snippetService.snippets.get(this.snippetId).categories;

  }

//Changer les index par id
  // Jamais utiliser un index pour identifier un objet

  onDelete(key: number) {
    this.snippetService.deleteSnippet(key);
  }

  onModify(key) {
    this.snippetService.modify = true;
    // this.snippetService.snippets.get(key)
  }


}
