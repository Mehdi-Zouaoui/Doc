import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SnippetService} from '../../services/snippet.service';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import DocumentData = firebase.firestore.DocumentData;
import {PrismService} from "../../services/prism.service";
import {Observable} from "rxjs";
import {error} from "util";

@Component({
  selector: 'app-single-snippet',
  templateUrl: 'single-snippet-view.component.html'

})
export class SingleSnippetViewComponent implements OnInit, AfterViewInit {
  key: string;
  index = this.snippetService.index;
  snippet:any;
  snippetContent: any;
  title: string;
  body: snippetContentModel[];
  dataObservable: Observable<any>;

  constructor(private snippetService: SnippetService, private router: Router, private route: ActivatedRoute, private prismService: PrismService) {
  }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('titleUrl');
    this.loadData()
      .then((data : Map<any , DocumentData>) => {
    this.snippet = data.get(this.key);
    this.snippetContent = this.snippet.body;
    console.log('yo', this.snippetContent)
        this.prismService.highlightAll()
  })
// ;    this.snippet = this.snippetService.snippets.get(this.key);

    // this.loadData().then((item:Map<any,DocumentData>) => {
    //   console.log(item);
    //   this.snippet = item.get(this.key);
    //   this.snippetContent = this.snippet.body;
    // });

  }

  ngAfterViewInit(): void {
    setTimeout(() => this.prismService.highlightAll() , 1000);
  }

  async loadData() {
   return await this.snippetService.getData();

  }

  asyncData() {

  }
}
