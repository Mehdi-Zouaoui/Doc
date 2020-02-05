import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {SnippetService} from '../../../../services/snippet.service';
import {PrismService} from '../../../../services/prism.service';
import {ActivatedRoute} from '@angular/router';
import DocumentData = firebase.firestore.DocumentData;
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-snippet-card',
  templateUrl: './snippet-card.component.html'
})

export class SnippetCardComponent implements OnInit, AfterViewInit {
  @Input() snippet: any;
  categoryNames: any;
  highlighted = false;
  @Input() categoryKey: any;
  snippets = this.snippetService.snippets;
  faEllipsisV = faEllipsisV ;
  constructor(
    private snippetService: SnippetService,
    private prismService: PrismService,
    private route: ActivatedRoute) {}

  async ngOnInit() {
    try {
      this.categoryNames = await this.snippetService.getCategoriesData();
    } catch (e) {
      console.log('ERREUR', e);
    }
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
}
