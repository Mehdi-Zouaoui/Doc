import {AfterViewInit, Component, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
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
  contents: Array<DisplayContentModel>;

  categoryForm: FormGroup;
  categories: Map<string, DocumentData>;
  categoryClicked: boolean = false;
  badges: Array<string> = [];
  display: DocumentData;
  highlighted: Boolean = false;
  displays = this.displayService.displays;
  key: string;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private router: Router,
    private prismService: PrismService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.key = this.route.snapshot.paramMap.get('sanitizeTitle');
    console.log(this.key);
     if (this.key) {
      this.loadOneData()
        .then((display: Map<any, DocumentData>) => {
        this.display = display.get(this.key);
        this.initModifyForm();
      })
    }
  }

  initForm() {
    console.log('display', this.display);
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

  initModifyForm() {

    console.log(this.displayForm.controls);
    console.log(this.display);
    this.displayForm.controls.body = this.fb.array(this.display.body.map(elem => this.addContents(elem)));
    this.displayForm.patchValue({
      title: this.display.title,
      category: this.display.category
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
    console.log(entry);
    if (this.key) {
      this.displayService.updateData(entry);
    } else {
      this.displayService.createData(entry);
    }

    this.router.navigate(['/display']);
  }

  async loadOneData() {
    return await this.displayService.getData();
  }
}
