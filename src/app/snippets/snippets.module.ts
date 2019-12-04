import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import{SnippetRoutingModule} from './snippet-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import {EditSnippetComponent} from './editSnippet/editSnippet.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {SnippetsComponent} from "./snippets.component";
import {OrderBy} from "../pipes/orderBy.pipe";


@NgModule({
  declarations: [
    EditSnippetComponent,
    SidebarComponent,
    SnippetsComponent,
    OrderBy
  ],
  exports: [
    RouterModule
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SnippetRoutingModule

  ]
})
export class SnippetsModule {
}
