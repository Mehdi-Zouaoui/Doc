import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SnippetService} from "../../services/snippet.service";
import {snippetContentModel} from "../../models/snippets/snippetContent.model";
import {PrismService} from "../../services/prism.service";
import {ActivatedRoute} from '@angular/router';
import {CategoryModel} from "../../models/snippets/category.model";
import DocumentData = firebase.firestore.DocumentData;
import {SnippetsModel} from "../../models/snippets/snippets.model";
import{faEllipsisV} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styles: ['']
})

export class SnippetsComponent implements OnInit, AfterViewInit {
  @Input() snippet:any;
  categoryNames: any;
  highlighted: Boolean = false;
  @Input() categoryKey: any;
  snippets = this.snippetService.snippets;
  faEllipsisV = faEllipsisV ;
  constructor(private snippetService: SnippetService, private prismService: PrismService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.snippetService.modify = false;
    this.loadCategories().then((category: Map<any, DocumentData>) => {
      this.categoryNames = category
    });
  }

  ngAfterViewInit(): void {
    if (!this.highlighted) {
      this.snippet.value.body.forEach(() => {
        this.prismService.highlightAll();
      });
      this.highlighted = true;
    }
  }

  onDelete(key: number) {
    this.snippetService.deleteSnippet(key);
  }

  onModify() {
    this.snippetService.modify = true;
  }

  async loadCategories() {
    const myCategories = await this.snippetService.getCategoriesData();
    return myCategories;
  }

}
