import {Component, OnInit} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';

import {CategoryModel} from '../../models/snippets/category.model';

@Component({
  selector: 'app-snippets-view',
  templateUrl: './snippets-view.component.html',
  styleUrls: ['./snippets-view.component.scss']
})
export class SnippetsViewComponent implements OnInit {
  snippets = this.snippetService.snippets;
  category = this.snippetService.categoryId;


  constructor(private snippetService: SnippetService) {}

  ngOnInit() {
    this.snippetService.getData();
    this.snippetService.getCategoriesData();
  }


  receiveId($event) {
    console.log('EVENT', $event);
    this.category = $event;
  }
}
