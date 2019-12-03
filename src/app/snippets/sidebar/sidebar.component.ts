import {Component, Input, OnInit} from '@angular/core';
import {stringify} from "querystring";
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'snippetSidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  navLinks : any[];
  constructor() { }

  ngOnInit() {
    this.navLinks = [
      {title : 'Home'},
      {title : 'Form'},
      {title : 'Snippet'}
    ]
  }
  @Input() menus: string[];
  activeTab: string;
  displaySearch: string ;

  faSearch = faSearch;
  faPlus = faPlus;

}
