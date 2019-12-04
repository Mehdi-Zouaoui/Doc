import {Component, Input, OnInit} from '@angular/core';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import {SnippetService} from "../../services/snippet.service";

@Component({
  selector: 'snippetSidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  categories : Array<any>;

  constructor( private snippet : SnippetService) {
  }

  ngOnInit() {
   this.categories = this.snippet.categories
  }

  @Input() menus: string[];

  faSearch = faSearch;
  faPlus = faPlus;

}
