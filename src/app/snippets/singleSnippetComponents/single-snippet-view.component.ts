import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';
import {ActivatedRoute, Router} from '@angular/router';
import DocumentData = firebase.firestore.DocumentData;
import {PrismService} from '../../services/prism.service';

@Component({
  selector: 'app-single-snippet',
  templateUrl: 'single-snippet-view.component.html'
})

export class SingleSnippetViewComponent implements OnInit, AfterViewInit {
  key: string;
  index = this.snippetService.index;
  snippet: any;
  snippetContent: any;
  title: string;
  body: snippetContentModel[];

  constructor(
    private snippetService: SnippetService,
    private router: Router,
    private route: ActivatedRoute,
    private prismService: PrismService) {}

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('titleUrl');
    this.loadData()
      .then((data: Map<any , DocumentData>) => {
        this.snippet = data.get(this.key);
        this.snippetContent = this.snippet.body;
        this.prismService.highlightAll();
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.prismService.highlightAll() , 1000);
  }

  async loadData() {
    return await this.snippetService.getData();
  }
}
