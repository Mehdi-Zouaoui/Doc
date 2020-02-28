import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnippetService} from '../../services/snippet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnippetsModel} from '../../models/snippets/snippets.model';
import {DisplayService} from '../../services/display.service';
import {CategoryModel} from '../../models/snippets/category.model';
import {PrismService} from '../../services/prism.service';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {editorConfig, LOADING_STATUS} from '../../../environments/environment';
import DocumentData = firebase.firestore.DocumentData;

@Component({
  selector: 'app-snippet-edit',
  templateUrl: './editSnippet.component.html'
})
export class EditSnippetComponent implements OnInit, AfterViewInit {
  editorConfig = editorConfig;
  faTrash = faTrash;
  snippetForm: FormGroup;
  categoryForm: FormGroup;
  body: FormArray;
  key: string;
  categories: unknown;
  categoryClicked: boolean;
  fieldType: string;
  language: string;
  snippet: DocumentData;
  LOADING_STATUS = LOADING_STATUS;
  dataLoadingStatus = LOADING_STATUS.LOADING;


  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private snippetService: SnippetService,
    private router: Router,
    private route: ActivatedRoute,
    private prismService: PrismService
  ) {
  }

  async ngOnInit() {
    this.initForm();
    this.categoryClicked = false;
    this.key = this.route.snapshot.paramMap.get('sanitizeTitleURL');
    this.categories = await this.snippetService.getCategoriesData();
    if (this.key) {
      try {
        this.snippet = await this.snippetService.getOneData(this.key);
        this.dataLoadingStatus = LOADING_STATUS.LOADED;
        this.initModifyForm();
      } catch (e) {
        console.log(e);
        this.dataLoadingStatus = LOADING_STATUS.ERROR;
      }
    } else {
      this.dataLoadingStatus = LOADING_STATUS.NONE;
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
    this.categoryForm = this.fb.group({
      categoryTitle: ''
    });
  }

  initModifyForm() {
    this.snippetForm.controls.body = this.fb.array(this.snippet.body.map(elem => this.addContents(elem)));
    this.snippetForm.patchValue({
      title: this.snippet.title,
      categoriesArray: this.snippet.categories,
    });
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

  onSubmitCategory() {
    const categoryFormValue = this.categoryForm.value;
    const entry = new CategoryModel(
      categoryFormValue.categoryTitle,
      categoryFormValue.categoryTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().split(' ').join('_').toLocaleLowerCase(),
    );
    this.snippetService.addCategory(entry);
  }

  async onSubmit() {
    const formValue = this.snippetForm.controls;
    const entry = new SnippetsModel(
      formValue.title.value,
      formValue.title.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().split(' ').join('_').toLocaleLowerCase(),
      formValue.body.value,
      formValue.categoriesArray.value
    );
    if (!this.key) {
      this.snippetService.createSnippet(entry);
    } else {
      await this.snippetService.updateSnippet(entry);
    }
    this.router.navigate(['/snippets', this.key ? this.key : entry.sanitizeTitle ]).then();
  }
}
