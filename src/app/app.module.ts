import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AutosizeModule } from 'ngx-autosize';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { DisplayModule } from './display/display.module';

import {SnippetsModule} from './snippets/snippets.module';
import { SnippetsComponent } from './snippets/snippets.component';
import {SidebarComponent} from './snippets/sidebar/sidebar.component';



@NgModule({
  declarations: [
    AppComponent,
    SnippetsComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    FontAwesomeModule,
    AutosizeModule,

    AppRoutingModule,
    DisplayModule,
    SnippetsModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
