import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {DisplayService} from '../../services/display.service';
import {DisplayContentModel} from '../../models/display/DisplayContent.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  faPlus = faPlus;
  displayForm: FormGroup;
  content: FormGroup;

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
      content: this.fb.array(
        [
          this.fb.control({field: 'text', content: 'dsfsf'}),
          this.fb.control({field: 'number', content: 5}),
        ]
      )
    });
  }


  addField(type): void {

  }

  onSubmit() {
    const formValue = this.displayForm.value;

    formValue.content = [];
    formValue.content[0] = {};
    formValue.content[0].field = 'textarea';
    formValue.content[0].content = 'textarea dtc';
    const newContent = new DisplayContentModel(
      formValue.title,
      formValue.title,
      formValue.content
    );
    console.warn('submit', newContent);

    this.displayService.addContent(newContent);
  }
}
