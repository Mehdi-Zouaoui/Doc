import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditSnippetComponent} from "./editSnippet/editSnippet.component";
import {SingleSnippetEditComponent} from "./singleSnippetComponents/single-snippet-edit.component";
import {SingleSnippetViewComponent} from "./singleSnippetComponents/single-snippet-view.component";

const snippetRoutes: Routes = [
  {path : 'snippets/editSnippet', component: EditSnippetComponent},
  {path : 'snippets/edit/:sanitizeTitleURL', component: SingleSnippetEditComponent},
  {path : 'snippets/:titleUrl' , component : SingleSnippetViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(snippetRoutes)],
  exports: [RouterModule]

})
export class SnippetRoutingModule { }
