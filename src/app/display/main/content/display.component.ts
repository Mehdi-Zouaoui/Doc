import { Component, OnInit } from '@angular/core';
import {DisplayService} from '../../../services/display.service';
import DocumentData = firebase.firestore.DocumentData;
import {Router} from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit {
  menus: unknown;
  activeTab: string;

  constructor(
    private displayService: DisplayService,
    private router: Router,
  ) {}

  ngOnInit() {
   this.displayService.getData()
   .then(res => this.menus = res);
   this.activeTab = '';
  }

  deleteDisplay(key) {
    this.displayService.deleteDisplay(key);
    this.router.navigate(['/display']);
  }

  result(activeTab) {
    this.activeTab = activeTab;
  }
}
