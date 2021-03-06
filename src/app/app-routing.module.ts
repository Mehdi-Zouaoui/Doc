import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SnippetsComponent} from './snippets/main/content/snippets.component';

const routes: Routes = [
  {path : 'snippets', component: SnippetsComponent},
  {path : '', component: SnippetsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
