import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SnippetService} from '../../../services/snippet.service';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import DocumentData = firebase.firestore.DocumentData;

@Component({
  selector: 'app-snippet-sidebar',
  templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  snippets = this.snippetService.snippets;
  @Output() idEvent = new EventEmitter<object>();
  faSearch = faSearch;
  faPlus = faPlus;
  snippetSearch: string;
  categories: Map<string, DocumentData>;
  activeCategory: string;

  constructor(private snippetService: SnippetService) {}
  
  ngOnInit() {
    this.categories = this.snippetService.categories;
  }

  sendCategory(category) {
    category ? this.activeCategory = category.value.sanitizeTitle : this.activeCategory = '';
    this.idEvent.emit(category);
  }

}

