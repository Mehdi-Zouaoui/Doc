import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SnippetService} from '../../services/snippet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnippetsModel} from '../../models/snippets/snippets.model';
import {DisplayService} from '../../services/display.service';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';
import {CategoryModel} from '../../models/snippets/category.model';
import {PrismService} from "../../services/prism.service";
import DocumentData = firebase.firestore.DocumentData;

@Component({
  selector: 'snippet-edit',
  templateUrl: './editSnippet.component.html'
})
export class EditSnippetComponent implements OnInit, AfterViewInit {
  snippetIndex: number;
  snippetForm: FormGroup;
  categoryForm: FormGroup;
  body: FormArray;
  key: string;
  categoriesArray: Array<string>;
  categories: Map<string, DocumentData>;
  badges: Array<string> = [];
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
    this.categories = this.snippetService.categories;
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
    setTimeout(()=> {
      this.prismService.highlightAll();
    },1000)
  }


  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes[this.snippetService.getData()]) {
  //     this.groupPosts = this.groupByCategory(this.data);
  //   }
  // }
  // this.key ? this.fb.array(this.contents.map(elem => this.addContents(elem))) :
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
    })
  }

  // this.snippetService.modify ? this.fb.array(
  //   this.contents.map(elem => this.addContents(elem))) : this.fb.array([]),

  initModifyForm() {
    // this.snippetForm.addControl('body' ,  this.fb.array(this.contents.map(elem => this.addContents(elem))));
    //   this.snippetForm.setControl('body', new FormControl(this.fb.array(this.contents.map(elem => this.addContents(elem)))));
      console.log(this.snippetForm.controls.body = this.fb.array(this.snippet.body.map(elem => this.addContents(elem))));
    console.log('SnippetForm' , this.snippetForm.controls.body);

    // categoriesArray : this.snippet.categories
    // this.snippetForm.body = this.fb.array([]);
    // this.snippetForm.body = this.snippet.body.map(elem => this.addContents(elem));

    this.snippetForm.patchValue({
      title: this.snippet.title,
      categoriesArray: this.snippet.categories,
       // body: this.snippet.body.forEach((controls) => console.log(controls) )
    });
    // this.snippet.body.forEach((content , index) =>{
    //   this.snippetForm.controls.body[index].controls.content = content.content;
    //   this.snippetForm.controls.body[index].controls.type = content.type;
    //   console.log(index)
    // })
    console.log(this.snippetForm);
  }

  getCategoriesBadges() {
    console.log('badges' , this.snippet.categories);
    return this.snippet.categories;
  }

  showCategoryForm() {
    return this.categoryClicked = true;
  }

  addContents(control): FormGroup {
    return this.fb.group({
      content: this.fb.control([control.content]),
      type: [control.type, [Validators.required]],
    });
  }

  removeBodyContent(i: number) {
    this.body = this.snippetForm.get('body') as FormArray;
    this.body.removeAt(i);
    console.log('Body', this.snippetForm.value.body);
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

  updateCat() {
    this.snippetService.getCategoriesData();
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
    const formValue = this.snippetForm.value;
    const entry = new SnippetsModel(
      formValue.title,
      formValue.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().split(' ').join('_').toLocaleLowerCase(),
      formValue.body,
      formValue.categoriesArray
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

  trackByFn(index) {
    console.log("index", index);
    return index;
  }
}
