import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import DocumentData = firebase.firestore.DocumentData;
import {PrismService} from "../../services/prism.service";

@Component({
  selector: 'app-single-snippet',
  templateUrl: 'single-snippet-view.component.html'

})
export class SingleSnippetViewComponent implements OnInit, AfterViewInit {
  key: string;
  index = this.snippetService.index;
  snippet: DocumentData;
  snippetContent: any;
  title: string;
  body: snippetContentModel[];

  constructor(private snippetService: SnippetService, private router: Router, private route: ActivatedRoute, private prismService: PrismService) {
  }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('titleUrl');
    this.snippetService.getData();
    this.snippet = this.snippetService.snippets.get(this.key);
    this.snippetContent = this.snippet.body;

  }

  ngAfterViewInit(): void {
    this.prismService.highlightAll();
  }

}
