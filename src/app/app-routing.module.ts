import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SnippetsComponent} from './snippets/snippets.component';
import {ModerationComponent} from './moderation/moderation.component';


const routes: Routes = [
  {path : 'snippets', component: SnippetsComponent},
  {path : 'moderation', component: ModerationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
