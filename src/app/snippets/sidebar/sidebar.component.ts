import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {CategoryModel} from '../../models/snippets/category.model';
import {SnippetsViewComponent} from '../../views/snippets-view/snippets-view.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'snippetSidebar',
  // tslint:disable-next-line:max-line-length
  template: ' <li class="nav-item"><a  class="nav-link" routerLinkActive="active" (click)=" sendCategory()  ;" >{{category.value.name}}</a></li> '
})
export class SidebarComponent implements OnInit {
  constructor( private snippetService: SnippetService , private snippetView: SnippetsViewComponent , private route: ActivatedRoute) {
  }

  categories = this.snippetService.categories;
  @Input() category: object;
  // @Input() categoryName: string;
  @Input() menus: string[];
  snippets = this.snippetService.snippets;
  @Output() idEvent = new EventEmitter<object>();
  @Output() nameEvent = new EventEmitter<string>();
  ngOnInit() {

  }
  sendCategory() {
    this.idEvent.emit(this.category);
    // this.nameEvent.emit(this.categoryName)
  }


getId(key: number) {
  console.log('id', this.category);
  return this.categories.get(key);
}
getFilteredSnippet(key) {
    this.snippetService.categoryId = key;
    console.log('ici mon pote regarde ici ' , key);
    console.log('this is service CategoryId' , this.snippetService.categoryId);
}

}
