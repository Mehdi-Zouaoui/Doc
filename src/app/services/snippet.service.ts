import {Injectable} from '@angular/core';
import {SnippetsModel} from '../models/snippets/snippets.model';
import {CategoryModel} from '../models/snippets/category.model';
import {FormGroup} from '@angular/forms';
import {snippetContentModel} from '../models/snippets/snippetContent.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class SnippetService {
  modify: boolean;
  index: number;
  categoryId: number;
  snippets: Map<any, SnippetsModel> = new Map();
  categories: Map<string, CategoryModel> = new Map();
  // categories: Map<number, CategoryModel> = new Map([[1,
  //   new CategoryModel(
  //     'Animations',
  //     'animations',
  //     1
  //   )], [2,
  //   new CategoryModel(
  //     'JS',
  //     'javascript',
  //     2),
  // ], [3,
  //   new CategoryModel(
  //     'Filter',
  //     'filter',
  //     3)]
  // ]);


  constructor() {

  }

  addSnippet(snippet: SnippetsModel) {
    this.snippets.set(String(this.snippets.size + 1), snippet);
    console.log('YO', this.snippets);
  }


  getCategoryName(key): Array<string> {
    let categoryNameArray: Array<string> = [];
    const snapshot: any = this.getData();
    snapshot.categories.forEach(name => {
      categoryNameArray.push(name);
    });
    return categoryNameArray
  }

  // var userId = firebase.auth().currentUser.uid;
  // return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  // var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  getData() {
    firebase.database().ref('/snippets')
      .once('value').then((data: DataSnapshot) => {
      data.forEach((child: DataSnapshot) => {
        this.snippets.set(child.key, child.val());

      })
    })
  }

  getCategoriesData() {
    firebase.database().ref('/categories')
      .once('value').then((data: DataSnapshot) => {
      data.forEach((child: DataSnapshot) => {
        this.categories.set(child.key, child.val());

      })
    })
  }

  updateCategorieData() {

  }

  test(snippet: SnippetsModel) {
    console.log('snippetHERE', snippet);
  }

  updateData(snippet: SnippetsModel, key) {

    firebase.database().ref('/snippets').child(key)
      .update({
        title: snippet.title,
        sanitizeTitle: snippet.sanitizeTitle,
        body: snippet.body,
        categories: snippet.categories,

      })
  }

  deleteSnippet(key) {
    this.snippets.delete(key);
    firebase.database().ref('snippets').child(key).remove();
  }

  deleteAllCategories(key) {
    this.snippets.delete(key);
    firebase.database().ref('snippets').child(key).remove();
  }

  pushDatabase(snippet: SnippetsModel) {
    firebase.database().ref('snippets/').push({
      title: snippet.title,
      sanitizeTitle: snippet.sanitizeTitle,
      body: snippet.body,
      categories: snippet.categories,

    });
  }

  pushCategoryDatabase(categoryModel: CategoryModel) {

    firebase.database().ref('categories').push({
      name: categoryModel.name,
      sanitizeName: categoryModel.sanitizeName
    });
  }
}


// loadSnippet(snippetForm: FormGroup, index: number): void {
//   snippetForm.setValue({
//     title: this.snippets[index].title,
//     body: this.snippets[index].body
//   });
// }



