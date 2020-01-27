import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SnippetsComponent} from "./snippets.component";
import {EditSnippetComponent} from "./editSnippet/editSnippet.component";
import {SingleSnippetComponent} from "./single-snippet/single-snippet.component";

const snippetRoutes: Routes = [
  {path : 'snippets/editSnippet', component: EditSnippetComponent},
  {path : 'snippets/:sanitizeTitleURL', component: SingleSnippetComponent},
  // {path : 'snippets/category/:categoryId' , component: SnippetsComponent},
  {path: '', component: SnippetsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(snippetRoutes)],
  exports: [RouterModule]

})
export class SnippetRoutingModule { }
