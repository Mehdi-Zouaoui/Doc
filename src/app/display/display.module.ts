import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayRoutingModule } from './display-routing.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { DisplayComponent } from './display.component';

@NgModule({
  declarations: [
    DisplayComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DisplayRoutingModule
  ]
})
export class DisplayModule {
  public menus = [
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
}
