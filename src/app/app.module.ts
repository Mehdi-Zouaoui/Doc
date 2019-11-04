import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { SnippetsComponent } from './snippets/snippets.component';
import { ModerationComponent } from './moderation/moderation.component';
import { HeaderComponent } from './header/header.component';
import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/languages/fr.js';
import 'froala-editor/js/plugins/code_view.min.js'

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    SnippetsComponent,
    ModerationComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FroalaEditorModule,
    FroalaViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
