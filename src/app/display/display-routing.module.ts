import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DisplayComponent} from './display.component';


const routes: Routes = [
  {path : 'display', component: DisplayComponent},
  {path : '', component: DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DisplayRoutingModule { }
