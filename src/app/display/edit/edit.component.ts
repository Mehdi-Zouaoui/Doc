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
          this.fb.control({type: 'text', content: 'dsfsf', id: 0}),
          this.fb.control({type: 'number', content: 5, id: 1}),
        ]
      )
    });
  }


  addField(type): void {
    const add = new FormControl({content: '', type});
    this.body = this.displayForm.get('body') as FormArray;
    this.body.push(add);
  }

    onSubmit() {
    console.log(this.displayForm.value);
    }
  }
