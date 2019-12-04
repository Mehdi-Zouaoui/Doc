import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SnippetService} from '../../services/snippet.service';
import {Router} from '@angular/router';
import {SnippetsModel} from '../../models/snippets/snippets.model';
import {DisplayService} from "../../services/display.service";


@Component({
  selector: 'snippet-edit',
  templateUrl: './editSnippet.component.html'
})
export class EditSnippetComponent implements OnInit {


  displayForm: FormGroup;
  body: FormArray;
  contents : Array<any>;
  categories : Array<any>;


  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private snippet:SnippetService,
    private router:Router

  ) {}

  ngOnInit() {
    this.contents = [
      {
        content: 'Bulles',
        type: 'code',
        id: 0,
        index: 0
      },
      {
        content: 'Bulle en arrière plan avec tête des avatars',
        type: 'text',
        id: 1,
        index: 1
      }
    ];
    this.categories = this.snippet.categories;
    console.log(this.contents);
    console.log(this.categories);
    this.initForm();
  }

  initForm() {
    this.displayForm = this.fb.group({
      title: 'filter',
      body: this.fb.array(
        this.contents.map(elem => this.addContents(elem)))
    });
  }

  addContents(control) : FormGroup {
    return this.fb.group({
      content: this.fb.control([control.content]),
      type: [control.type,[Validators.required]],
      id: [control.id,[Validators.required]],
      index: [control.index,[Validators.required]]
    });
  }


  addField(type): FormGroup {
    const add = this.fb.group({
      content: type === 'code' ? 'code' : (type === 'title' ? 'Bienvenue' : 3),
      type,
      // @ts-ignore
      id: this.displayForm.controls.body.controls.length,
      // @ts-ignore
      index: this.displayForm.controls.body.controls.length
    });
    this.body = this.displayForm.get('body') as FormArray;
    this.body.push(add);

    return;
  }

  onSubmit() {
    console.log(this.displayForm.value);
    const formValue = this.displayForm.value;
    const entry = new SnippetsModel(
      formValue['title'],
      formValue['body']
    );
    this.snippet.addSnippet(entry);
    this.router.navigate(['/snippets']);
  }
}
