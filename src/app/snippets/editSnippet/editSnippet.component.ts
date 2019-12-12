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

  snippetIndex : number;
  snippetForm: FormGroup;
  body: FormArray;
  contents : Array<any>;
  categories : Array<any>;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private snippetService:SnippetService,
    private router:Router

  ) {}

  ngOnInit() {
    this.snippetIndex = this.snippetService.index;
    this.contents = this.snippetService.snippets[0].body;
    this.categories = this.snippetService.categories;
    console.log(this.contents);
    console.log(this.snippetService.snippets);
    this.initForm();
    if(this.snippetService.modify) this.initModifyForm();


  }

  initForm() {
    console.log('CREATION EN COURS' , this.snippetService.modify);

    this.snippetForm = this.fb.group({
      title: 'filter',
      body: this.fb.array(
        this.contents.map(elem => this.addContents(elem))),
      categoryId:''
    },
  )
  }
  initModifyForm(){
    console.log('INDEX' , this.snippetIndex);
    console.log('MODIFICATIONS EN COURS' , this.snippetService.modify);
    this.snippetForm.patchValue({
      title:this.snippetService.snippets[this.snippetIndex].title,
      body:this.snippetService.snippets[this.snippetIndex].body,
      categoryId:this.snippetService.snippets[this.snippetIndex].categoryId,
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

  // @ts-ignore
  onSubmit() {

    console.log(this.snippetForm.value);
    const formValue = this.snippetForm.value;
    const entry = new SnippetsModel(
      formValue['title'],
      formValue['body'],
      formValue['categoryId'],
     !this.snippetService.modify ? this.snippetService.snippets.length +1 : this.snippetService.snippets.length
    );
    if(!this.snippetService.modify){
      this.snippetService.addSnippet(entry);
    }else this.snippetService.snippets[this.snippetService.index] = entry ;

    this.router.navigate(['/snippets']);
  }

}
