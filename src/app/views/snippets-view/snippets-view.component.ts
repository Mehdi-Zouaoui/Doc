import { Component, OnInit } from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-snippets-view',
  templateUrl: './snippets-view.component.html',
  styleUrls: ['./snippets-view.component.scss']
})
export class SnippetsViewComponent implements OnInit {
  categories = this.snippetService.categories;
  snippets = this.snippetService.snippets;
  categoryId = this.snippetService.categoryId;
  categoryIndex = this.snippetService.categoryIndex;
  faSearch = faSearch;
  faPlus = faPlus;
  constructor(private snippetService: SnippetService) { }
  ngOnInit() {

  }
  getCategoryIndex(index: number) {
    console.log('INDEX', index);
    this.categoryIndex = index;
    return index;
  }
  getCategoryId(index: number) {
    this.categoryId = index;
    console.log('ID', this.categoryId);
    return index;
  }
}
