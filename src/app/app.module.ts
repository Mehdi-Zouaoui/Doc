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
import { SnippetsComponent } from './snippets/snippets.component';
import {SidebarComponent} from './snippets/sidebar/sidebar.component';
import { SnippetsViewComponent } from './views/snippets-view/snippets-view.component';
import { SingleSnippetComponent} from './snippets/single-snippet/single-snippet.component';
import {PrismService} from "./services/prism.service";
import {CategoryFilter} from "./pipes/categoryFilter.pipe";

@NgModule({
  declarations: [
    AppComponent,
    SnippetsComponent,
    HeaderComponent,
    SidebarComponent,
    SnippetsViewComponent,
    SingleSnippetComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    DisplayModule,
    SnippetsModule
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
