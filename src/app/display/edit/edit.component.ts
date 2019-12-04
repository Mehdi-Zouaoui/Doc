import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DisplayService} from '../../services/display.service';
import {DisplayModel} from '../../models/display/Display.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  faPlus = faPlus;
  displayForm: FormGroup;
  body: FormArray;
  contents : Array<any>;


  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private router:Router
  ) {}

  ngOnInit() {
    this.contents = [
      {
        content: 'split:separator:index',
        type: 'code',
        id: 0,
        index: 0
      },
      {
        content: 'Scinde une chaine avec la fonction split et renvoie la sous-chaîne spécifiée par index',
        type: 'text',
        id: 1,
        index: 1
      }
    ];
    console.log(this.contents);
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
    const entry = new DisplayModel(
      formValue['title'],
      formValue['title'],
      formValue['body']
    );
    this.displayService.addContent(entry);
    this.router.navigate(['/display']);
  }
}
