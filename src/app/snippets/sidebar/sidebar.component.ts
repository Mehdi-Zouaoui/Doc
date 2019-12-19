import {Component, Input, OnInit} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {CategoryModel} from '../../models/snippets/category.model';
import {SnippetsViewComponent} from "../../views/snippets-view/snippets-view.component";

@Component({
  selector: 'snippetSidebar',
  // tslint:disable-next-line:max-line-length
  template: '<div class="nav-item w-100"> <a routerLinkActive="active" (click)="getId(categoryId) ; getIndex(categoryIndex)">{{categories[categoryIndex].name}}</a> </div>'
})
export class SidebarComponent implements OnInit {
  constructor( private snippetService: SnippetService , private snippetView: SnippetsViewComponent) {
  }

  categories: CategoryModel[] = this.snippetService.categories;
  @Input() categoryId;
  @Input() categoryIndex: number;
  @Input() menus: string[];
  snippets = this.snippetService.snippets;

  ngOnInit() {
   this.categories = this.snippetService.categories;
  }

getId(id: number) {
    this.snippetView.getCategoryId(id);
}
getIndex(index: number) {
    this.snippetView.getCategoryIndex(index);
}
}
