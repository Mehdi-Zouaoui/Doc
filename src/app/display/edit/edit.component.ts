import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DisplayService} from '../../services/display.service';
import {DisplayModel} from '../../models/display/Display.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PrismService} from '../../services/prism.service';
import DocumentData = firebase.firestore.DocumentData;
import {CategoryModel} from '../../models/display/Category.model';
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {LOADING_STATUS} from "../../../environments/environment";
import {editorConfig} from "../../../environments/environment";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
  editorConfig = editorConfig;
  LOADING_STATUS = LOADING_STATUS;
  displayForm: FormGroup;
  body: FormArray;
  fieldType: string;
  categoryForm: FormGroup;
  categories: Map<string, DocumentData>;
  categoryClicked = false;
  display: DocumentData;
  key: string;
  dataLoadingStatus = LOADING_STATUS.LOADING;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private router: Router,
    private prismService: PrismService,
    private route: ActivatedRoute,
  ) {
  }

  async ngOnInit() {
    this.initForm();
    this.key = this.route.snapshot.paramMap.get('sanitizeTitle');
    if (this.key) {
      try {
        this.display = await this.displayService.getOneData(this.key);
        this.dataLoadingStatus = LOADING_STATUS.LOADED;
        this.initModifyForm();
      } catch (e) {
        console.error(e);
        this.dataLoadingStatus = LOADING_STATUS.ERROR;
      }
    }
  }

  initForm() {
    this.displayForm = this.fb.group({
      title: '',
      sanitizeTitle: '',
      body: this.fb.array([]),
      category: ''
    });
    this.categoryForm = this.fb.group({
      categoryTitle: ''
    });
    this.categories = this.displayService.categories;
  }

  initModifyForm() {
    this.displayForm.patchValue({
      title: this.display.title,
      category: this.display.category
    });
    this.displayForm.controls.body = this.fb.array(this.display.body.map(elem => this.addContents(elem)));
  }

  addContents(control): FormGroup {
    return this.fb.group({
      content: this.fb.control(control.content),
      type: [control.type, [Validators.required]]
    });
  }

  addField(type): FormGroup {
    this.fieldType = type;
    const add = this.fb.group({
      content: '',
      type,
    });
    this.body = this.displayForm.get('body') as FormArray;
    this.body.push(add);
    return add;
  }

  onSubmitCategory() {
    const categoryFormValue = this.categoryForm.value;
    const entry = new CategoryModel(
      categoryFormValue.categoryTitle,
      categoryFormValue.categoryTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('_').toLocaleLowerCase(),
    );
    this.displayService.addCategory(entry);
  }

  onSubmit() {
    const formValue = this.displayForm.controls;
    console.log(formValue);
    const entry = new DisplayModel(
      formValue.title.value,
      formValue.title.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('_').toLocaleLowerCase(),
      formValue.body.value,
      formValue.category.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('_').toLocaleLowerCase()
    );
    if (this.key) {
      this.displayService.updateData(entry);
    } else {
      this.displayService.createData(entry);
    }
    this.router.navigate(['/display']).then();
  }
}
