import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DisplayService} from '../../../services/display.service';
import {ActivatedRoute, Router} from '@angular/router';
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import {PrismService} from '../../../services/prism.service';
import {LOADING_STATUS} from "../../../../environments/environment";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})

export class DisplayComponent implements OnInit, AfterViewInit {
  menus: unknown;
  activeTab: string;
  key: string;
  faEllipsisV = faEllipsisV;
  LOADING_STATUS = LOADING_STATUS;
  dataLoadingStatus = LOADING_STATUS.LOADING;

  constructor(
    private displayService: DisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private prismService: PrismService
  ) {
  }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('sanitizeTitle');
    this.displayService.getData()
      .then(res => {
        this.menus = res;
        this.dataLoadingStatus = LOADING_STATUS.LOADED;
      }).catch(e => {
      console.error(e);
      this.dataLoadingStatus = LOADING_STATUS.ERROR;
    });

    this.activeTab = '';
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.prismService.highlightAll(), 1000);
  }
}
