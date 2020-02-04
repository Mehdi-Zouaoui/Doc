import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnippetService} from '../../services/snippet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnippetsModel} from '../../models/snippets/snippets.model';
import {DisplayService} from '../../services/display.service';
import {CategoryModel} from '../../models/snippets/category.model';
import {PrismService} from '../../services/prism.service';
import DocumentData = firebase.firestore.DocumentData;
import {faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-snippet-edit',
  templateUrl: './editSnippet.component.html'
})
export class EditSnippetComponent implements OnInit, AfterViewInit {
  faTrash = faTrash;
  snippetIndex: number;
  snippetForm: FormGroup;
  categoryForm: FormGroup;
  body: FormArray;
  key: string;
  categoriesArray: Array<string>;
  categories: unknown;
  categoryClicked: boolean;
  fieldType: string;
  language: string;
  snippet: DocumentData;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private snippetService: SnippetService,
    private router: Router,
    private route: ActivatedRoute,
    private prismService: PrismService
  ) {
  }

  ngOnInit() {
    this.initForm();
    this.categoryClicked = false;
    this.key = this.route.snapshot.paramMap.get('sanitizeTitleURL');
    this.snippetService.getCategoriesData()
    .then(res => this.categories = res);
    this.initCategoryForm();
    if (this.key) {
      this.load()
        .then((snippets: Map<any, DocumentData>) => {
          this.snippet = snippets.get(this.key);
          this.initModifyForm();
        });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.prismService.highlightAll();
    }, 1000);
  }

  initForm() {
    this.snippetForm = this.fb.group({
      title: '',
      sanitizeTitle: '',
      body: this.fb.array([]),
      categoriesArray: ''
    });
  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      categoryName: ''
    });
  }

  initModifyForm() {
    this.snippetForm.controls.body = this.fb.array(this.snippet.body.map(elem => this.addContents(elem)));
    this.snippetForm.patchValue({
      title: this.snippet.title,
      categoriesArray: this.snippet.categories,
    });
  }

  showCategoryForm() {
    return this.categoryClicked = true;
  }

  addContents(control): FormGroup {
    return this.fb.group({
      content: this.fb.control(control.content),
      type: [control.type, [Validators.required]],
    });
  }

  removeBodyContent(i: number) {
    this.body = this.snippetForm.get('body') as FormArray;
    this.body.removeAt(i);
  }

  addField(type): FormGroup {
    this.fieldType = type;
    const add = this.fb.group({
      content: '',
      type,
    });
    this.body = this.snippetForm.get('body') as FormArray;
    this.body.push(add);
    return add;
  }

  async load() {
    return await this.snippetService.getData();
  }

  onSubmitCategory() {
    const categoryFormValue = this.categoryForm.value;
    const entry = new CategoryModel(
      categoryFormValue.categoryName,
      categoryFormValue.categoryName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().split(' ').join('_').toLocaleLowerCase(),
    );
    this.snippetService.pushCategoryDatabase(entry);
  }

  onSubmit(key) {
    const formValue = this.snippetForm.controls;
    const entry = new SnippetsModel(
      formValue.title.value,
      formValue.title.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().split(' ').join('_').toLocaleLowerCase(),
      formValue.body.value,
      formValue.categoriesArray.value
    );
    if (!this.snippetService.modify) {
      this.snippetService.pushDatabase(entry);
    } else {
      this.snippetService.snippets.set(key, entry);
      this.snippetService.updateData(entry, key);
    }
    this.snippetService.modify = false;
    this.router.navigate(['/snippets']);
  }
}
