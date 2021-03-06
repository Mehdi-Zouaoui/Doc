import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import DocumentData = firebase.firestore.DocumentData;
import {PrismService} from '../../../../services/prism.service';
import {DisplayContentModel} from '../../../../models/display/DisplayContent.model';
import {DisplayService} from '../../../../services/display.service';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {LOADING_STATUS} from '../../../../../environments/environment';

@Component({
  selector: 'app-display-view',
  templateUrl: 'displayView.component.html'
})

export class DisplayViewComponent implements OnInit, AfterViewInit {
  key: string;
  display: DocumentData;
  title: string;
  body: DisplayContentModel[];
  faEllipsisV = faEllipsisV;
  LOADING_STATUS = LOADING_STATUS;
  dataLoadingStatus = LOADING_STATUS.LOADING;

  constructor(
    private displayService: DisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private prismService: PrismService) {
    router.events.subscribe(() => {
      this.loadPage().then();
    });
  }

  async ngOnInit() {
    this.route.url.subscribe(() => {
      this.loadPage();
    });
  }

  async loadPage() {
    this.key = this.route.snapshot.paramMap.get('sanitizeTitle');
    try {
      this.display = await this.displayService.getOneData(this.key);
      this.prismService.highlightAll();
      this.highlightAll();
      this.dataLoadingStatus = LOADING_STATUS.LOADED;
    } catch (e) {
      console.log('ERREUR', e);
      this.dataLoadingStatus = LOADING_STATUS.ERROR;
    }
  }

  ngAfterViewInit(): void {
    this.highlightAll();
  }

  highlightAll(): void {
    setTimeout(() => this.prismService.highlightAll() , 100);
  }

  deleteDisplay(key) {
    this.displayService.deleteDisplay(key);
    this.router.navigate(['/display']).then();
  }
}
