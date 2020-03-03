import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DisplayModule } from './display/display.module';
import {SnippetsModule} from './snippets/snippets.module';
import {PrismService} from './services/prism.service';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import {AutosizeModule} from 'ngx-autosize';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthentificationComponent } from './authentification/authentification.component';

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthentificationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    DisplayModule,
    SnippetsModule,
    BrowserAnimationsModule,
    AutosizeModule,
    AngularEditorModule,
    ReactiveFormsModule,
  ],
  providers: [
    PrismService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
