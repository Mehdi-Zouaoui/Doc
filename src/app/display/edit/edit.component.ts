import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DisplayService} from '../../services/display.service';
import {DisplayModel} from '../../models/display/Display.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PrismService} from "../../services/prism.service";
import DocumentData = firebase.firestore.DocumentData;
import {CategoryModel} from "../../models/display/Category.model";
import {DisplayContentModel} from "../../models/display/DisplayContent.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  faPlus = faPlus;
  displayForm: FormGroup;
  body: FormArray;
  fieldType: string;
  contents : Array<DisplayContentModel>;

  categoryForm: FormGroup;
  categories: Map<string, DocumentData>;
  categoryClicked: boolean = false;
  badges: Array<string> = [];
  display: any;
  highlighted: Boolean = false;
  displays = this.displayService.displays;
  key: string;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private router:Router,
    private prismService: PrismService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.key = this.route.snapshot.paramMap.get('sanitizeTitle');
    if (this.key){
      this.display = this.displayService.getOneData(this.key);
      this.contents = this.display.values().next().value.body;
    }
    console.log(this.display);
    console.log(this.contents);

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

    if (this.key) {
      this.initModifyForm(this.key, this.display);
    }
console.log(this.displayForm);
  }

  addContents(control): FormGroup {
    return this.fb.group({
      content: this.fb.control([control.content]),
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

  initModifyForm(key: string, display: Map<string, DisplayModel>) {
    console.log(this.contents);
    this.displayForm.patchValue({
      title: display.get(key).title,
      body: this.contents.forEach(elem => this.addContents(elem)),
      category: display.get(key).category,
    });
  }

  showCategoryForm() {
    return this.categoryClicked = true;
  }

  updateCat() {
    this.displayService.getCategoriesData();
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
    console.log(this.displayForm.value);
    const formValue = this.displayForm.value;
    const entry = new DisplayModel(
      formValue.title,
      formValue.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('_').toLocaleLowerCase(),
      formValue.body,
      formValue.category.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('_').toLocaleLowerCase()
    );
    this.displayService.updateData(entry);
    this.router.navigate(['/display']);
  }
}
