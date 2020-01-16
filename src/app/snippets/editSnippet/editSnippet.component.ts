import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SnippetService} from '../../services/snippet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnippetsModel} from '../../models/snippets/snippets.model';
import {DisplayService} from '../../services/display.service';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';
import {CategoryModel} from '../../models/snippets/category.model';

@Component({
  selector: 'snippet-edit',
  templateUrl: './editSnippet.component.html',
  styleUrls:['./editSnippet.component.scss']
})
export class EditSnippetComponent implements OnInit {
  snippetIndex: number;
  snippetForm: FormGroup;
  body: FormArray;
  key: string;
  contents: snippetContentModel[];
  categoriesArray: Array<string>;
  categories: Map<number, CategoryModel>;
  badges:Array<string>=[];

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private snippetService: SnippetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('id');
    this.contents = this.snippetService.snippets.get(this.key).body;
    this.categories = this.snippetService.categories;
    this.initForm();
    if (this.key) {
      this.initModifyForm(this.key , this.snippetService.snippets);
    }
    this.getCategoriesBadges(this.key, this.snippetService.snippets);
    this.badges = this.getCategoriesBadges(this.key,this.snippetService.snippets);
  }
  test() {
    setInterval( () => {console.log( this.snippetService.snippets); } , 2000 );
  }
  initForm() {
    console.log('CREATION EN COURS', this.snippetService.modify);

    this.snippetForm = this.fb.group({
        title: '',
        body: this.fb.array(
          this.contents.map(elem => this.addContents(elem))),
        categoriesArray: ''
      },
    );

  }

  initModifyForm(key: string, snippet: Map<string , SnippetsModel>) {
    this.snippetForm.patchValue({
      title: snippet.get(key).title,
      body: snippet.get(key).body,
      categoryId: snippet.get(key).categories,
    });
  }

  getCategoriesBadges( key:string, snippet: Map<string , SnippetsModel>){
    return snippet.get(key).categories;
    }
  addContents(control): FormGroup {
    return this.fb.group({
      content: this.fb.control([control.content]),
      type: [control.type, [Validators.required]],
      id: [control.id, [Validators.required]],
      index: [control.index, [Validators.required]]
    });
  }


  addField(type): FormGroup {
    const add = this.fb.group({
      content: type === 'code' ? 'code' : (type === 'title' ? 'Bienvenue' : 3),
      type,
    });
    this.body = this.snippetForm.get('body') as FormArray;
    this.body.push(add);
    return add;
  }

  onSubmit(key) {
    const formValue = this.snippetForm.value;
    const entry = new SnippetsModel(
      formValue.title,
      formValue.body,
      formValue.categoriesArray
    );
    if (!this.snippetService.modify) {
      this.snippetService.pushDatabase(entry);
    } else {
      this.snippetService.snippets.set(key, entry);
      this.snippetService.updateData(entry , key);
    }
    this.snippetService.modify = false;
    this.router.navigate(['/snippets']);
  }
}
