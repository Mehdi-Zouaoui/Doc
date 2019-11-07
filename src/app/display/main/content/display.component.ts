import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit {
  menus = [
    {
      title :  'un',
      sanitizeTitle : 'un',
      content : 'lorem un'
    },
    {
      title :  'deux',
      sanitizeTitle : 'deux',
      content : 'lorem deux'
    },
    {
      title :  'trois',
      sanitizeTitle : 'trois',
      content : 'lorem trois'
    },
    {
      title :  'épique',
      sanitizeTitle : 'epique',
      content : 'lorem épique'
    }
  ];
  activeTab = this.menus[0].title;

  constructor() { }

  ngOnInit() {
  }

  result(activeTab) {
    this.activeTab = activeTab;
  }
}
