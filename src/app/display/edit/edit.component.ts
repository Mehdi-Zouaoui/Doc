import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {DisplayService} from '../../services/display.service';
import {DisplayModel} from '../../models/display/Display.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  faPlus = faPlus;
  displayForm: FormGroup;
  body: FormArray;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.displayForm = this.fb.group({
      title: 'ee',
      body: this.fb.array(
        [
          this.fb.control({type: 'text', content: 'dsfsf'}),
          this.fb.control({type: 'number', content: 5}),
        ]
      )
    });
  }


  addField(type): void {
    const add = new FormControl({content: 'dsfsf', type});
    this.body = this.displayForm.get('body') as FormArray;
    this.body.push(add);
  }

  onSubmit() {
    const formValue = this.displayForm.value;

    formValue.content = [];
    formValue.content[0] = {};
    formValue.content[0].field = 'textarea';
    formValue.content[0].content = 'textarea dtc';
    const newContent = new DisplayModel(
      formValue.title,
      formValue.title,
      formValue.content
    );
    console.warn('submit', newContent);

    this.displayService.addContent(newContent);
  }
}
