import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SnippetService} from '../../services/snippet.service';
import {Router} from '@angular/router';
import {SnippetsModel} from '../../models/snippets/snippets.model';
import {DisplayService} from '../../services/display.service';
import {SingleSnippetComponent} from '../single-snippet/single-snippet.component';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';


@Component({
  selector: 'snippet-edit',
  templateUrl: './editSnippet.component.html'
})
export class EditSnippetComponent implements OnInit {

  snippetIndex: number;
  snippetForm: FormGroup;
  snippetBodyFrom: FormGroup;
  body: FormArray;
  contents: snippetContentModel[];
  categories: Array<any>;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private snippetService: SnippetService,
    private router: Router

  ) {}

  ngOnInit() {
    // console.log('RESET');

    if (this.snippetService.modify) {
      this.snippetIndex = this.snippetService.index;
      this.contents = this.snippetService.snippets[this.snippetIndex].body;
    } else {
      this.snippetIndex = this.snippetService.snippets.length;
      this.contents = this.snippetService.contentModel;
    }
    this.categories = this.snippetService.categories;
    // console.log(this.contents);
    console.log(this.snippetService.snippets);
    this.initForm();
    if (this.snippetService.modify) { this.initModifyForm(); }
  }

  initForm() {
    console.log('CREATION EN COURS' , this.snippetService.modify);

    this.snippetForm = this.fb.group({
      title: 'Titre',
      body: this.fb.array(
        this.contents.map(elem => this.addContents(elem))),
      categoryId: ''
    },
  );
  }
  initModifyForm( ) {
    console.log('SNIPPET BEFORE' ,  this.snippetService.snippets[this.snippetIndex]);
    this.snippetForm.setValue({
      title: this.snippetService.snippets[this.snippetIndex].title,
      body: this.snippetService.snippets[this.snippetIndex].body,
      categoryId: this.snippetService.snippets[this.snippetIndex].categoryId,
    });
    console.log('BODY' , this.snippetForm.value.body);
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
      // @ts-ignore
      id: this.snippetForm.controls.body.controls.length,
      // @ts-ignore
      index: this.snippetForm.controls.body.controls.length
    });
    this.body = this.snippetForm.get('body') as FormArray;
    this.body.push(add);

    return;
  }


  onSubmit(index) {

    // console.log(this.snippetForm.value);
    console.log('INDEX', this.snippetService.index);
    console.log('1', this.snippetService.snippets[this.snippetService.index]);
    const formValue = this.snippetForm.value;
    const entry = new SnippetsModel(
      formValue.title,
      formValue.body,
      formValue.categoryId,
     !this.snippetService.modify ? this.snippetService.snippets.length + 1 : this.snippetService.snippets[index].id
    );
    if (!this.snippetService.modify) {
      this.snippetService.addSnippet(entry);
    } else {
      this.snippetService.snippets[this.snippetService.index] = entry;
    }
    console.log('2' , this.snippetService.snippets[this.snippetService.index]);
    console.log('INDEX', this.snippetService.index);
    this.router.navigate(['/snippets']);
  }

}
