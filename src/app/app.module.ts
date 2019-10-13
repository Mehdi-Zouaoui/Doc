import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { SnippetsComponent } from './snippets/snippets.component';
import { ModerationComponent } from './moderation/moderation.component';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    SnippetsComponent,
    ModerationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
