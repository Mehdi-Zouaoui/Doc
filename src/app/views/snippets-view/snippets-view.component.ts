import { Component, OnInit } from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import {CategoryModel} from '../../models/snippets/category.model';
import {SidebarComponent} from "../../snippets/sidebar/sidebar.component";
@Component({
  selector: 'app-snippets-view',
  templateUrl: './snippets-view.component.html',
  styleUrls: ['./snippets-view.component.scss']
})
export class SnippetsViewComponent implements OnInit {
  categories: Map<number, CategoryModel> = this.snippetService.categories;
  snippets = this.snippetService.snippets;
  categoryId = this.snippetService.categoryId;
  faSearch = faSearch;
  faPlus = faPlus;

  constructor(private snippetService: SnippetService) { }
  ngOnInit() {
    this.snippetService.getData();
  }

  receiveId($event) {
    console.log('EVENT' , $event);
    this.categoryId = $event;
  }
}
