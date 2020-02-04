import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//Mehdi
// import {EditSnippetComponent} from './editSnippet/editSnippet.component';
// import {SingleSnippetEditComponent} from './singleSnippetComponents/single-snippet-edit.component';
// import {SingleSnippetViewComponent} from './singleSnippetComponents/single-snippet-view.component';
//Lory
import {SnippetsComponent} from './main/content/snippets.component';
import {SnippetViewComponent} from './main/content/snippetView/snippet-view.component';
import {EditSnippetComponent} from './edit/editSnippet.component';

const snippetRoutes: Routes = [
  // {path : 'snippets/editSnippet', component: EditSnippetComponent},
  {path : 'snippets/edit/:sanitizeTitleURL', component: EditSnippetComponent},
  {path : 'snippets/:titleUrl' , component : SnippetViewComponent}
];

@NgModule({
  declarations: [
  ],
  imports: [RouterModule.forChild(snippetRoutes)],
  exports: [RouterModule]

})
export class SnippetRoutingModule { }
