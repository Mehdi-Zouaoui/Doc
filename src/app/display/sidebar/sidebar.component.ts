import {Component, Input, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  @Input() menus: string[];
  activeTab: string;
  displaySearch: string ;

  faSearch = faSearch;

  constructor() {

  }

  ngOnInit() {
    // @ts-ignore
    const {title} = this.menus[0];
    this.activeTab = title;
  }
}
