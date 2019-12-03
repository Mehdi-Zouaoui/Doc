import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './main/content/display.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {path : 'display', component: DisplayComponent},
  {path : 'display/editSnippet', component: EditComponent},
  {path : '', component: DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DisplayRoutingModule { }
