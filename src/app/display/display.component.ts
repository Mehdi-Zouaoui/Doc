import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html'
})
export class DisplayComponent implements OnInit {
  menus = [
    {
      title :  'un',
      content : 'lorem un'
    },
    {
      title :  'deux',
      content : 'lorem deux'
    },
    {
      title :  'trois',
      content : 'lorem trois'
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
