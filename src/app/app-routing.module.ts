import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DisplayComponent} from "./display/display.component";
import {SnippetsComponent} from "./snippets/snippets.component";
import {ModerationComponent} from "./moderation/moderation.component";


const routes: Routes = [
  {path : 'display', component: DisplayComponent},
  {path : 'snippets', component: SnippetsComponent},
  {path : 'moderation', component: ModerationComponent},
  {path : '', component: DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
