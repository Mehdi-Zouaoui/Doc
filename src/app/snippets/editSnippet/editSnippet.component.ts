import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {SnippetService} from '../../services/snippet.service';
import {Router} from '@angular/router';
import {SnippetsModel} from '../../models/snippets/snippets.model';

@Component({
  selector: 'snippet-edit',
  templateUrl: './editSnippet.component.html'
})
export class EditSnippetComponent implements OnInit {

  constructor(private formBuilder: FormBuilder ,  private snippetService : SnippetService , private router:Router) {}
  snippetForm : FormGroup;

  ngOnInit() {
    this.initForm();
  }
  initForm(){
    this.snippetForm = this.formBuilder.group({
      title:['', Validators.required],
      body : this.formBuilder.array([])
    })
    console.log('FORM' , this.snippetForm);
  }
  onSubmitForm(){
  const formValue = this.snippetForm.value;
  const newSnippet = new SnippetsModel(
    formValue['title'],
    formValue['body'] ? formValue['body'] : [],
  );
  this.snippetService.addSnippet(newSnippet);
  this.router.navigate(['/snippets']);
  }
  getContent(): FormArray {
    return this.snippetForm.get('body') as FormArray;
  }
  onAddContent() {
    const newSnippetControl = this.formBuilder.control(null, Validators.required);
    this.getContent().push(newSnippetControl);
  }
}
