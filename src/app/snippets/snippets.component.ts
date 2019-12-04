import {Component, OnInit} from '@angular/core';
import {SnippetService} from '../services/snippet.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html'
})


export class SnippetsComponent implements OnInit {
  body =
  [{
    content:'',
    type: 'number'
  }];
  snippets = this.getSnippets();
  constructor(private snippetService: SnippetService ,  private router:Router) {
  }

  ngOnInit() {
    this.getSnippets();
  }

  getSnippets() {
    console.log('SNIPSNIP' , this.snippetService.snippets);
    return this.snippetService.snippets;
  }

  onDelete(i: number) {
    this.snippetService.deleteSnippet(i);
  }
// onModify(){
//     this.router.navigate(['/editSnippet'] , {id : this.snippet.snippets.id})
// }


}
