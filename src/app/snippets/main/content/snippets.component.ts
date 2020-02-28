import {Component, OnInit} from '@angular/core';
import {SnippetService} from '../../../services/snippet.service';
import {SnippetCardComponent} from './snippetCard/snippet-card.component';
import DocumentData = firebase.firestore.DocumentData;
import {editorConfig, LOADING_STATUS} from '../../../../environments/environment';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html'
})

export class SnippetsComponent implements OnInit {
  snippets: DocumentData;
  category = this.snippetService.categoryId;
  LOADING_STATUS = LOADING_STATUS;
  dataLoadingStatus = LOADING_STATUS.LOADING;
  constructor(private snippetService: SnippetService) {}

  async ngOnInit() {
    try {
      this.snippets = await this.snippetService.getData();
      await this.snippetService.getCategoriesData();
      this.dataLoadingStatus = LOADING_STATUS.LOADED;
    } catch (e) {
      console.log(e);
      this.dataLoadingStatus = LOADING_STATUS.ERROR;
    }
  }

  receiveId($event) {
    this.category = $event;
  }
}
