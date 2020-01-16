import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SnippetRoutingModule} from './snippet-routing.module';
import {EditSnippetComponent} from './editSnippet/editSnippet.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {OrderBy} from '../pipes/orderBy.pipe';
import {PrismService} from "../services/prism.service";
import {IsotopeModule} from 'ngx-isotope';
import {NgSelectModule} from '@ng-select/ng-select';
import {SearchSnippetFilterPipe} from "../pipes/searchSnippetFilter.pipe";


@NgModule({
  declarations: [
    EditSnippetComponent,
    OrderBy,
    SearchSnippetFilterPipe
  ],
  exports: [
    RouterModule,
    OrderBy,
    EditSnippetComponent,
    SearchSnippetFilterPipe

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FontAwesomeModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SnippetRoutingModule,
    IsotopeModule

  ],
  providers: [
    PrismService
  ]
})
export class SnippetsModule {
}
