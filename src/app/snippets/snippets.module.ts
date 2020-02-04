import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SnippetRoutingModule} from './snippet-routing.module';

import {SnippetsComponent} from './main/content/snippets.component';
import {SidebarComponent} from './main/sidebar/sidebar.component';
import {SnippetCardComponent} from './main/content/snippetCard/snippet-card.component';
import {SnippetViewComponent} from './main/content/snippetView/snippet-view.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {OrderBy} from '../pipes/orderBy.pipe';
import {SearchSnippetFilterPipe} from '../pipes/searchSnippetFilter.pipe';

import {NgSelectModule} from '@ng-select/ng-select';
import {AutosizeModule} from 'ngx-autosize';

import {PrismService} from '../services/prism.service';
import {SnippetService} from '../services/snippet.service';
import {EditSnippetComponent} from './edit/editSnippet.component';


@NgModule({
  declarations: [
    SidebarComponent,
    SnippetsComponent,
    SnippetCardComponent,
    SnippetViewComponent,
    EditSnippetComponent,
    OrderBy,
    SearchSnippetFilterPipe
  ],
  exports: [
    RouterModule,
    OrderBy,
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
    AutosizeModule
  ],
  providers: [
    SnippetService,
    PrismService
  ]
})
export class SnippetsModule {
}
