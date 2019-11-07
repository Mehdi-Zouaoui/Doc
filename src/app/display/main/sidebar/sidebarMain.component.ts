import {Component, Input, OnInit} from '@angular/core';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebarMain.component.html'
})
export class SidebarMainComponent implements OnInit {
  @Input() menus: string[];
  activeTab: string;
  displaySearch: string ;

  faSearch = faSearch;
  faPlus = faPlus;

  constructor() {

  }

  ngOnInit() {
    // @ts-ignore
    const {title} = this.menus[0];
    this.activeTab = title;
  }
}
