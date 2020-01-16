import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SnippetService} from '../../services/snippet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnippetsModel} from '../../models/snippets/snippets.model';
import {DisplayService} from '../../services/display.service';
import {snippetContentModel} from '../../models/snippets/snippetContent.model';
import {CategoryModel} from '../../models/snippets/category.model';
import {MatFormField} from '@angular/material';

@Component({
  selector: 'snippet-edit',
  templateUrl: './editSnippet.component.html',
  styleUrls: ['./editSnippet.component.scss']
})
export class EditSnippetComponent implements OnInit {
  snippetIndex: number;
  snippetForm: FormGroup;
  categoryForm: FormGroup;
  body: FormArray;
  key: string;
  contents: snippetContentModel[];
  categoriesArray: Array<string>;
  categories: Map<string, CategoryModel>;
  badges: Array<string> = [];
  categoryClicked: boolean;

  fieldType: string;

  constructor(
    private fb: FormBuilder,
    private displayService: DisplayService,
    private snippetService: SnippetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.categoryClicked = false;
    this.key = this.route.snapshot.paramMap.get('id');
    this.categories = this.snippetService.categories;
    this.initForm();
    this.initCategoryForm();

    this.snippetService.getCategoriesData();
    if (this.key) {
      this.initModifyForm(this.key, this.snippetService.snippets);
      this.badges = this.getCategoriesBadges(this.key, this.snippetService.snippets);
    }
  }

  initForm() {
    if (this.snippetService.modify) {
      this.contents = this.snippetService.snippets.get(this.key).body;
    }
    this.snippetForm = this.fb.group({
        title: '',
        sanitizeTitle: '',
        body: this.snippetService.modify ? this.fb.array(
          this.contents.map(elem => this.addContents(elem))) : this.fb.array([]),
        categoriesArray: ''
      },
    );

  }

  initCategoryForm() {
    this.categoryForm = this.fb.group({
      categoryName: ' '

    })
  }

  initModifyForm(key: string, snippet: Map<string, SnippetsModel>) {
    this.snippetForm.patchValue({
      title: snippet.get(key).title,
      body: snippet.get(key).body,
      categoryId: snippet.get(key).categories,
    });
  }

  getCategoriesBadges(key: string, snippet: Map<string, SnippetsModel>) {
    return snippet.get(key).categories;
  }

  showCategoryForm() {
    return this.categoryClicked = true;
  }

  addContents(control): FormGroup {
    return this.fb.group({
      content: this.fb.control([control.content]),
      type: [control.type, [Validators.required]],
      id: [control.id, [Validators.required]],
      index: [control.index, [Validators.required]]
    });
  }

  addField(type): FormGroup {
    this.fieldType = type;
    const add = this.fb.group({
      content: type === 'code' ? 'code' : (type === 'title' ? 'Bienvenue' : 3),
      type,
    });
    this.body = this.snippetForm.get('body') as FormArray;
    this.body.push(add);
    return add;
  }

  updateCat() {
    this.snippetService.getCategoriesData();
  }

  onSubmitCategory() {
    const categoryFormValue = this.categoryForm.value;
    const entry = new CategoryModel(
      categoryFormValue.categoryName,
      categoryFormValue.categoryName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('_').toLocaleLowerCase(),
    );
    this.snippetService.pushCategoryDatabase(entry);
  }

  onSubmit(key) {
    const formValue = this.snippetForm.value;
    const entry = new SnippetsModel(
      formValue.title,
      formValue.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').split(' ').join('_').toLocaleLowerCase(),
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
}
