import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SnippetViewComponent} from './main/content/snippetView/snippet-view.component';
import {EditSnippetComponent} from './edit/editSnippet.component';

const snippetRoutes: Routes = [
  {path : 'snippets/create', component: EditSnippetComponent},
  {path : 'snippets/edit/:sanitizeTitleURL', component: EditSnippetComponent},
  {path : 'snippets/:titleUrl' , component : SnippetViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(snippetRoutes)],
  exports: [RouterModule]
})
export class SnippetRoutingModule {}
