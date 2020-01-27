import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {CategoryModel} from '../../models/snippets/category.model';
import {SnippetsViewComponent} from '../../views/snippets-view/snippets-view.component';
import {ActivatedRoute} from '@angular/router';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import DocumentData = firebase.firestore.DocumentData;
@Component({
  selector: 'snippetSidebar',
  templateUrl:'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  constructor(
    private snippetService: SnippetService,
    private snippetView: SnippetsViewComponent,
    private route: ActivatedRoute) {}

  // categories = this.snippetService.categories;
  @Input() category: object;
  @Input() menus: string[];
  snippets = this.snippetService.snippets;
  @Output() idEvent = new EventEmitter<object>();
  faSearch = faSearch;
  faPlus = faPlus;
  snippetSearch: string;
  categories: Map<string, DocumentData>;

  ngOnInit() {
    this.categories = this.snippetService.categories;
  }

  sendCategory(category) {
    this.idEvent.emit(category);
  }

}

