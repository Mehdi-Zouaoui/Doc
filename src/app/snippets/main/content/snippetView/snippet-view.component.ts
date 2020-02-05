import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import DocumentData = firebase.firestore.DocumentData;
import {SnippetService} from '../../../../services/snippet.service';
import {PrismService} from '../../../../services/prism.service';
import {snippetContentModel} from '../../../../models/snippets/snippetContent.model';

@Component({
  selector: 'app-snippet-view',
  templateUrl: 'snippet-view.component.html'
})

export class SnippetViewComponent implements OnInit, AfterViewInit {
  key: string;
  snippet: any;
  snippetContent: any;
  title: string;
  body: snippetContentModel[];

  constructor(
    private snippetService: SnippetService,
    private router: Router,
    private route: ActivatedRoute,
    private prismService: PrismService) {}

  async ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('titleUrl');
    try {
      this.snippet = await this.snippetService.getOneData(this.key);
      console.log(this.snippet)
      this.prismService.highlightAll();
    } catch (e) {
      console.log('ERREUR', e);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.prismService.highlightAll() , 1000);
  }
}
