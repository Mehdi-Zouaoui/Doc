import {Component, Input, OnInit} from '@angular/core';
import {faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import DocumentData = firebase.firestore.DocumentData;
import {DisplayService} from '../../../services/display.service';
import {CategoryModel} from '../../../models/display/Category.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebarMain.component.html'
})
export class SidebarMainComponent implements OnInit {
  categories: DocumentData;
  subCategories: DocumentData;
  activeTab: string;
  displaySearch: string ;

  faSearch = faSearch;
  faPlus = faPlus;

  constructor(private displayService: DisplayService) {}

  ngOnInit() {
    this.displayService.getCategoriesData()
    .then(res => this.categories = res);
    this.displayService.getData()
    .then(res => this.subCategories = res);
  }
}
