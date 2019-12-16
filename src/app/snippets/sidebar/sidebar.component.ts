import {Component, Input, OnInit} from '@angular/core';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import {SnippetService} from "../../services/snippet.service";

@Component({
  selector: 'snippetSidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  categories: Array<any>;

  constructor( private snippetService: SnippetService) {
  }

  ngOnInit() {
   this.categories = this.snippetService.categories;
  }

  @Input() menus: string[];

  faSearch = faSearch;
  faPlus = faPlus;

  // onAdd(index: number) {
  //   this.snippetService.getIndex(index);
  // }

}
