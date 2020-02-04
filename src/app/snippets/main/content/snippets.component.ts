import {Component, OnInit} from '@angular/core';
import {SnippetService} from '../../../services/snippet.service';
import {SnippetCardComponent} from './snippetCard/snippet-card.component';
import DocumentData = firebase.firestore.DocumentData;

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html'
})

export class SnippetsComponent implements OnInit {
  snippets: DocumentData;
  category = this.snippetService.categoryId;
  constructor(private snippetService: SnippetService) {}

  ngOnInit() {
    this.snippetService.getData()
    .then(res => this.snippets = res);
    this.snippetService.getCategoriesData();
  }

  receiveId($event) {
    this.category = $event;
  }
}
