import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SnippetsComponent} from './snippets/snippets.component';
import {DisplayComponent} from './display/main/content/display.component';
import {SnippetsViewComponent} from "./views/snippets-view/snippets-view.component";

const routes: Routes = [
  {path : 'snippets', component: SnippetsViewComponent},
  {path : '', component: DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
