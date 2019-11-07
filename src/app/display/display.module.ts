import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { DisplayRoutingModule } from './display-routing.module';

import { SidebarMainComponent } from './main/sidebar/sidebarMain.component';
import { DisplayComponent } from './main/content/display.component';

import { EditComponent } from './edit/edit.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {SearchDisplayFilterPipe} from '../pipes/searchDisplayFilter.pipe';

@NgModule({
  declarations: [
    SidebarMainComponent,
    DisplayComponent,
    EditComponent,
    SearchDisplayFilterPipe
  ],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DisplayModule {
}
