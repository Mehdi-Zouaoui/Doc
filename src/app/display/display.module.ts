import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayRoutingModule } from './display-routing.module';

import { SidebarComponent } from './sidebar/sidebar.component';
import { DisplayComponent } from './display.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {FilterPipe} from '../pipes/filter.pipe';

@NgModule({
  declarations: [
    DisplayComponent,
    SidebarComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ]
})
export class DisplayModule {
}
