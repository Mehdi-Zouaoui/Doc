import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SnippetsComponent} from './snippets/snippets.component';
import {DisplayComponent} from './display/main/content/display.component';

const routes: Routes = [
  {path : 'snippets', component: SnippetsComponent},
  {path : '', component: DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
