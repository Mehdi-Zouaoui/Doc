import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DisplayService} from '../../../services/display.service';
import DocumentData = firebase.firestore.DocumentData;
import {Router} from '@angular/router';
import {PrismService} from '../../../services/prism.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit, AfterViewInit {
  menus: unknown;
  activeTab: string;

  constructor(
    private displayService: DisplayService,
    private router: Router,
    private prismService: PrismService
  ) {
  }

  ngOnInit() {
    this.displayService.getData()
      .then(res => this.menus = res);
    this.activeTab = '';
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.prismService.highlightAll() , 1000);


  }

  deleteDisplay(key) {
    this.displayService.deleteDisplay(key);
    this.router.navigate(['/display']);
  }

  result(activeTab) {
    this.activeTab = activeTab;
  }
}
