import {Component, NgModule, OnInit} from '@angular/core';
import { SnippetsModel} from "../models/snippets.model";
import {BrowserModule} from "@angular/platform-browser";
import {SnippetService} from "../services/snippet.service";

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss']
})

export class SnippetsComponent implements OnInit {

   snippets: SnippetsModel[];

  constructor() {
  }

  ngOnInit() {
    this.snippets = [
      {title : 'BUBULLE' , contentHTML : 'HTML HERE' , description : 'DESCRIPTION HERE'},
        {title : 'AVATAR' , contentHTML : 'HTML HERE' , description : 'DESCRIPTION HERE'}
      ];
  }
  onDeletClick(){

  }

}
