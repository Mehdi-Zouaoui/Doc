import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DisplayModule } from './display/display.module';
import {SnippetsModule} from './snippets/snippets.module';
import {SnippetsComponent} from "./snippets/snippetComponent/snippets.component";
import {SidebarComponent} from './snippets/sidebar/sidebar.component';
import {SnippetsViewComponent} from "./snippets/snippets-view.component";
import { SingleSnippetEditComponent} from './snippets/singleSnippetComponents/single-snippet-edit.component';
import {PrismService} from './services/prism.service';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
// import {CategoryFilter} from "./pipes/categoryFilter.pipe";
import {IsotopeModule} from "ngx-isotope";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SingleSnippetViewComponent} from "./snippets/singleSnippetComponents/single-snippet-view.component";

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    SnippetsComponent,
    HeaderComponent,
    SidebarComponent,
    SnippetsViewComponent,
    SingleSnippetEditComponent,
    SingleSnippetViewComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    DisplayModule,
    SnippetsModule,
    IsotopeModule,
    BrowserAnimationsModule
  ],
  providers: [
    PrismService
  ],
  exports: [
    SnippetsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
