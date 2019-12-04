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


  snippetForm: FormGroup;
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
    this.contents = this.snippet.snippets[0].body
    this.categories = this.snippet.categories;
    console.log(this.contents);
    console.log(this.snippet.snippets);
    if(!this.snippet.modify){
      this.initForm();
    }else this.initModifyForm()


  }

  initForm() {
    this.snippetForm = this.fb.group({
      title: 'filter',
      body: this.fb.array(
        this.contents.map(elem => this.addContents(elem))),
      categoryId:''
    },
  )
  }
  initModifyForm(){
    console.log('MODIFICATIONS EN COURS');
    this.snippetForm = this.fb.group({
      title:this.snippet.snippets[1].title,
      body: this.fb.array(
        this.contents.map(elem => this.addContents(elem))),
      categoryId:this.snippet.snippets[0].categoryId
    })
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
      id: this.snippetForm.controls.body.controls.length,
      // @ts-ignore
      index: this.snippetForm.controls.body.controls.length
    });
    this.body = this.snippetForm.get('body') as FormArray;
    this.body.push(add);

    return;
  }

  onSubmit() {
    console.log(this.snippetForm.value);
    const formValue = this.snippetForm.value;
    const entry = new SnippetsModel(
      formValue['title'],
      formValue['body'],
      formValue['categoryId'],
      this.snippet.snippets.length + 1);
    this.snippet.addSnippet(entry);
    this.router.navigate(['/snippets']);
  }

}
