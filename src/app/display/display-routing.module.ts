import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayComponent } from './main/content/display.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path : 'display/edit/:sanitizeTitle', component: EditComponent},
  {path : 'display/view/:sanitizeTitle', component: DisplayComponent},
  {path : 'display/create', component: EditComponent},
  {path : 'display', component: DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DisplayRoutingModule { }
