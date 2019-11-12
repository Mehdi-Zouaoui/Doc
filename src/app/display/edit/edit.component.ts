import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  faPlus = faPlus;

  displayForm: FormGroup;
  items: FormArray;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.displayForm = this.formBuilder.group({
      mainTitle: 'Ma premère doc',
      items: this.formBuilder.array([this.createItem('textarea')])
    });
  }

  createItem(type): FormGroup {
    return this.formBuilder.group({
      type: FormControl,
      content: FormControl
    });
  }

  addItem(type): void {
    this.items = this.displayForm.get('items') as FormArray;
    this.items.push(this.createItem(type));
  }
  onSubmit() {
    console.warn(this.displayForm.value);
  }
}
