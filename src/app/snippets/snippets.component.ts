import {Component, Input, NgModule, OnInit} from '@angular/core';
import {SnippetsModel} from "../models/snippets.model";
import {SnippetService} from "../services/snippet.service";

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss']
})


export class SnippetsComponent implements OnInit {

  snippets = this.getSnippets();

  constructor(private snippetService: SnippetService) {
  }

  ngOnInit() {
    this.getSnippets();
  }

  getSnippets() {
    return this.snippetService.snippets;
  }
  onDelete(i:number){
    this.snippetService.deleteSnippet(i);
  }


}
