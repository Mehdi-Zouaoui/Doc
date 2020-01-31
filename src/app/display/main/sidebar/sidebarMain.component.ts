import {Component, Input, OnInit} from '@angular/core';
import {faSearch, faPlus ,faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import DocumentData = firebase.firestore.DocumentData;
import {DisplayService} from "../../../services/display.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebarMain.component.html'
})
export class SidebarMainComponent implements OnInit {
  categories: Map<string, DocumentData>;
  subCategories: Map<string, DocumentData>;
  // @Input() menus: string[];
  activeTab: string;
  displaySearch: string ;

  faSearch = faSearch;
  faPlus = faPlus;



    constructor(private displayService: DisplayService) {}

  ngOnInit() {
    this.categories = this.displayService.getCategoriesData();
    this.subCategories = this.displayService.getData();
    // @ts-ignore
    // const {title} = this.menus[0];
    // this.activeTab = title;
  }
}
