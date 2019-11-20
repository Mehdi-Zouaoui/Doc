import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DisplayService} from "../../services/display.service";
import {DisplayContentModel} from "../../models/DisplayContent.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  faPlus = faPlus;

  displayForm : FormGroup;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.displayForm = this.fb.group({
        title: 'ee',
      content: []
      }
    )
  }

  createItem(type) {

  }

  addItem(type): void {

  }

  onSubmit() {
    const formValue = this.displayForm.value;
    const newContent = new DisplayContentModel(
      formValue['title'],
      formValue['title'],
      formValue['content'] = ['sdfsf','ça marche'],
    );
    console.warn('submit', newContent);

    this.displayService.addContent(newContent);
  }
}
