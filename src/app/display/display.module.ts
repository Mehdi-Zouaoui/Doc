import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayRoutingModule } from './display-routing.module';
import { SidebarMainComponent } from './main/sidebar/sidebarMain.component';
import { DisplayComponent } from './main/content/display.component';
import { EditComponent } from './edit/edit.component';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutosizeModule } from 'ngx-autosize';
import { SearchDisplayFilterPipe } from '../pipes/searchDisplayFilter.pipe';
import { DisplayService } from '../services/display.service';
import { PrismService } from '../services/prism.service';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {DisplayViewComponent} from "./main/content/displayView/displayView.component";
import {SnippetsModule} from "../snippets/snippets.module";

@NgModule({
  declarations: [
    SidebarMainComponent,
    DisplayComponent,
    DisplayViewComponent,
    EditComponent,
    SearchDisplayFilterPipe
  ],
  exports: [
    SidebarMainComponent
  ],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AutosizeModule,
    AngularEditorModule,
    SnippetsModule
  ],
  providers : [
    DisplayService,
    PrismService
  ]
})
export class DisplayModule {
}
