import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import{SnippetRoutingModule} from './snippet-routing.module';
import {EditSnippetComponent} from './editSnippet/editSnippet.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {OrderBy} from "../pipes/orderBy.pipe";
import { SingleSnippetComponent } from './single-snippet/single-snippet.component';


@NgModule({
  declarations: [
    EditSnippetComponent,
    OrderBy,
    SingleSnippetComponent
  ],
  exports: [
    RouterModule,
    OrderBy
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
