import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import DocumentData = firebase.firestore.DocumentData;
import {SnippetService} from '../../../../services/snippet.service';
import {PrismService} from '../../../../services/prism.service';
import {snippetContentModel} from '../../../../models/snippets/snippetContent.model';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {LOADING_STATUS} from '../../../../../environments/environment';


@Component({
  selector: 'app-snippet-view',
  templateUrl: 'snippet-view.component.html'
})

export class SnippetViewComponent implements OnInit, AfterViewInit {
  key: string;
  snippet: any;
  snippetContent: any;
  faEllipsisV = faEllipsisV;
  title: string;
  body: snippetContentModel[];
  LOADING_STATUS = LOADING_STATUS;
  dataLoadingStatus = LOADING_STATUS.LOADING;

  constructor(
    private snippetService: SnippetService,
    private router: Router,
    private route: ActivatedRoute,
    private prismService: PrismService) {}

  async ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('titleUrl');
    try {
      this.snippet = await this.snippetService.getOneData(this.key);
      this.prismService.highlightAll();
      this.dataLoadingStatus = LOADING_STATUS.LOADED;
    } catch (e) {
      console.log('ERREUR', e);
      this.dataLoadingStatus = LOADING_STATUS.ERROR;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.prismService.highlightAll() , 1000);
  }

  deleteSnippet(key) {
    this.snippetService.deleteSnippet(key);
    this.router.navigate(['/snippets']).then();
  }
}
