import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SnippetService} from '../../services/snippet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnippetsModel} from '../../models/snippets/snippets.model';
import {DisplayService} from '../../services/display.service';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';
import {CategoryModel} from "../../models/snippets/category.model";


@Component({
  selector: 'snippet-edit',
  templateUrl: './editSnippet.component.html'
})
export class EditSnippetComponent implements OnInit {

  snippetIndex: number;
  snippetForm: FormGroup;
  body: FormArray;
  key:string;
  contents: snippetContentModel[];
  categories: Map<number, CategoryModel>;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private snippetService: SnippetService,
    private router: Router,
    private route : ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.key = this.route.snapshot.paramMap.get('id');
    console.log('key' , this.key);
    this.contents = this.snippetService.contentModel;
    console.log('Index', this.snippetIndex);
    this.categories = this.snippetService.categories;
    console.log(this.snippetService.snippets);
    this.initForm();
    if (this.snippetService.modify) {
      this.initModifyForm(this.key);
    }
    // this.test();
  }
  test() {
    setInterval( ()=>{console.log( this.snippetService.snippets)} , 2000 )
  }
  initForm() {
    console.log('CREATION EN COURS', this.snippetService.modify);

    this.snippetForm = this.fb.group({
        title: 'Titre',
        body: this.fb.array(
          this.contents.map(elem => this.addContents(elem))),
        categoryId: ''
      },
    );
  }

  initModifyForm(key) {

    this.snippetForm.setValue({
      title: this.snippetService.snippets.get(key).title,
      body: this.snippetService.snippets.get(key).body,
      categoryId: this.snippetService.snippets.get(key).categoryId,
    });
    console.log('BODY', this.snippetForm.value.body);
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

      // id: this.snippetForm.controls.body.controls.length,
      //
      // index: this.snippetForm.controls.body.controls.length
    });
    this.body = this.snippetForm.get('body') as FormArray;
    this.body.push(add);

    return;
  }


  onSubmit(key) {

    const formValue = this.snippetForm.value;
    const entry = new SnippetsModel(
      formValue.title,
      formValue.body,
      formValue.categoryId,
    );
    if (!this.snippetService.modify) {
      this.snippetService.addSnippet(entry);
    } else {
      this.snippetService.snippets.set(key, entry);
    }
    this.snippetService.modify = false;
    this.router.navigate(['/snippets']);
  }

}
