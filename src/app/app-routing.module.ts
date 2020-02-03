import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DisplayComponent} from './display/main/content/display.component';
import {SnippetsViewComponent} from "./snippets/snippets-view.component";
import {EditSnippetComponent} from "./snippets/editSnippet/editSnippet.component";
import {SingleSnippetEditComponent} from "./snippets/singleSnippetComponents/single-snippet-edit.component";
import {SingleSnippetViewComponent} from "./snippets/singleSnippetComponents/single-snippet-view.component";

const routes: Routes = [
  {path : '', component: SnippetsViewComponent},
  {path : 'snippets', component: SnippetsViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
