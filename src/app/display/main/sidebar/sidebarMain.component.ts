import { Component, OnInit } from '@angular/core';
import { faSearch, faPlus} from '@fortawesome/free-solid-svg-icons';
import DocumentData = firebase.firestore.DocumentData;
import { DisplayService } from '../../../services/display.service';

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
  dataLoaded = false;
  constructor(private displayService: DisplayService) {}

  async ngOnInit() {
    try{
      this.categories = await this.displayService.getCategoriesData();
      this.subCategories = await this.displayService.getData();
      this.dataLoaded = true;
    }catch (e) {
      console.error(e);
    }


    console.log('categories',this.categories);
    console.log('subCategories',this.subCategories);
  }
}
