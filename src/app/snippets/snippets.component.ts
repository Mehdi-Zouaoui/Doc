import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {SnippetService} from '../services/snippet.service';
import {snippetContentModel} from '../models/snippets/snippetContent.model';
import {PrismService} from '../services/prism.service';
import Prism from 'prismjs';
import {ActivatedRoute} from '@angular/router';
import {CategoryModel} from '../models/snippets/category.model';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styles: ['pre.line-numbers > code{ overflow: visible ; padding : 0 ; color : white;}   ']
})


export class SnippetsComponent implements OnInit, AfterViewInit {
  @Input() snippetId: number;
  @Input() snippetTitle: string;
  @Input() snippetBody: snippetContentModel[];
  @Input() snippetCategory: Map<any, CategoryModel>;
  @Input() sanitizeTitle: string;
  categoryNames: string | Array<string>;
  title: string;
  highlighted: Boolean = false;
  @Input() categoryKey: any;
  snippets = this.snippetService.snippets;
  id: number;
  private key: string;

  constructor(private snippetService: SnippetService, private prismService: PrismService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.snippetService.modify = false;
    this.key = this.route.snapshot.paramMap.get('id');
    this.categoryKey = this.route.snapshot.paramMap.get('categoryId');
    this.categoryNames = this.snippetService.snippets.get(this.snippetId).categories;
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


  onDelete(key: number) {
    this.snippetService.deleteSnippet(key);
  }

  onModify(key) {
    this.snippetService.modify = true;
    // this.snippetService.snippets.get(key)
  }


}
