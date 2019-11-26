import { Component, OnInit } from '@angular/core';
import {DisplayService} from '../../../services/display.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit {
  menus: any[];
  activeTab: string;

  constructor(private displayService: DisplayService) {
    this.menus = this.displayService.menus;
    this.activeTab = this.menus[0].title;
  }

  ngOnInit() {
  }

  result(activeTab) {
    this.activeTab = activeTab;
  }
}
