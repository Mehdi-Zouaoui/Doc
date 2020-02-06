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
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-snippet-edit',
  templateUrl: './editSnippet.component.html'
})
export class EditSnippetComponent implements OnInit, AfterViewInit {
  editorConfig: AngularEditorConfig ={
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top'
  };
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
  ) {}

  async ngOnInit() {
    this.initForm();
    this.categoryClicked = false;
    this.key = this.route.snapshot.paramMap.get('sanitizeTitleURL');
    this.categories = await this.snippetService.getCategoriesData();
    if (this.key) {
      this.snippet = await this.snippetService.getOneData(this.key);
      this.initModifyForm();
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

  async onSubmit(key) {
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
    this.router.navigate(['/snippets']);
  }
}
