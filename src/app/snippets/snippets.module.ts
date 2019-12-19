import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SnippetRoutingModule} from './snippet-routing.module';
import {EditSnippetComponent} from './editSnippet/editSnippet.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {OrderBy} from '../pipes/orderBy.pipe';
import {CategoryFilter} from '../pipes/categoryFilter.pipe';



@NgModule({
  declarations: [
    EditSnippetComponent,
    OrderBy,
    CategoryFilter
  ],
  exports: [
    RouterModule,
    OrderBy,
    CategoryFilter,
    EditSnippetComponent
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
