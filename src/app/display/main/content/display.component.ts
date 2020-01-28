import { Component, OnInit } from '@angular/core';
import {DisplayService} from '../../../services/display.service';
import DocumentData = firebase.firestore.DocumentData;
import {Router} from "@angular/router";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit {
  menus:  Map<string, DocumentData>;
  activeTab: string;

  constructor(
    private displayService: DisplayService,
    private router:Router,
  ) {}

  ngOnInit() {
    this.menus = this.displayService.getData();
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
