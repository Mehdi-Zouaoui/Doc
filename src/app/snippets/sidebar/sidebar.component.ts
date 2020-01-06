import {Component, Input, OnInit} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {CategoryModel} from '../../models/snippets/category.model';
import {SnippetsViewComponent} from "../../views/snippets-view/snippets-view.component";

@Component({
  selector: 'snippetSidebar',
  // tslint:disable-next-line:max-line-length
  template: '<div class="nav-item w-100"> <a routerLinkActive="active" (click)="getFilteredSnippet(categoryId);">{{categoryName}}</a> </div>'
})
export class SidebarComponent implements OnInit {
  constructor( private snippetService: SnippetService , private snippetView: SnippetsViewComponent) {
  }

  categories = this.snippetService.categories;
  @Input() categoryId: number;
  @Input() categoryName: string;
  @Input() menus: string[];
  snippets = this.snippetService.snippets;

  ngOnInit() {
   this.categories = this.snippetService.categories;

  }

getId(key: number) {
  console.log('id',this.categoryId);
   return this.categories.get(key);
}
getFilteredSnippet(key){
    this.snippetService.filteredSnippet(key);
}

}
