import {Component, NgModule, OnInit} from '@angular/core';
import { SnippetsModel} from "../models/snippets.model";
import { SNIPPETS} from "../models/mock-snippets";
import {SnippetService} from "../services/snippet.service";

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.scss']
})

export class SnippetsComponent implements OnInit {

  snippets = SNIPPETS;

  constructor(private snippetService: SnippetService) {
  }

  ngOnInit() {

  }
}
