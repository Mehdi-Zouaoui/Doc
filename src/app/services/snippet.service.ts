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
  snippets : Map<any, SnippetsModel> = new Map();
  contentModel: snippetContentModel[] = [
    new snippetContentModel('text ', 'text', 0, 2),
    new snippetContentModel('code ', 'text', 1, 0),
    new snippetContentModel('description ', 'text', 2, 1)
  ];
//   snippetsRef: Map<string, SnippetsModel> = new Map([['1',
//     new SnippetsModel('Regex', [
//       {content: 'test', type: 'text', id: 0, index: 0},
//       {content: 'test2', type: 'text', id: 1, index: 2},
//       {content: 'test1', type: 'te xt', id: 2, index: 1},
//     ], 1)], ['2',
//     new SnippetsModel('Bulles', [
//       {content: 'ICI', type: 'text', id: 0, index: 0},
//       {content: 'LA', type: 'text', id: 1, index: 2},
//       {
//         content: `ngAfterViewInit(): void {
//   if (!this.highlighted) {
//     this.snippetBody.forEach((item) => {
//       if(item.type === 'code') {
//         this.prismService.highlightAll();
//       }
//     });
//     this.highlighted = true;
//   }
// }`, type: 'code', id: 2, index: 1
//       },
//     ], 2)]
//   ]);
  categories: Map<number, CategoryModel> = new Map([[1,
    new CategoryModel(
      'Animations',
      'animations',
      1
    )], [2,
    new CategoryModel(
      'JS',
      'javascript',
      2),
  ], [3,
    new CategoryModel(
      'Filter',
      'filter',
      3)]
  ]);


  constructor() {

  }

  addSnippet(snippet: SnippetsModel) {
    this.snippets.set(String(this.snippets.size + 1), snippet);
    console.log('YO', this.snippets);
  }



  getCategoryName(key): Array<string> {
    let categoryNameArray:Array<string> = [];
    const snapshot:any = this.getData();
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
      .once('value').then((data : DataSnapshot) =>{
        data.forEach((child : DataSnapshot) =>{
            this.snippets.set(child.key , child.val());
            console.log(this.snippets);
          console.log('DATASNAPSHOT' ,child.val());
        })
    })


  }
  test(snippet : SnippetsModel){
    console.log('snippetHERE' , snippet);
  }
  updateData(snippet : SnippetsModel , key){

    firebase.database().ref('/snippets').child(key)
      .update({
        title: snippet.title,
        body: snippet.body,
        categories: snippet.categories,

      })
  }

  deleteSnippet(key) {
    this.snippets.delete(key);
    firebase.database().ref('snippets').child(key).remove();
  }

  pushDatabase(snippet:  SnippetsModel) {

      firebase.database().ref('snippets/').push({
        title: snippet.title,
        body: snippet.body,
        categories: snippet.categories,

      });
  }

  pushCategoryDatabase(categoryModel : CategoryModel) {

    firebase.database().ref('categories').push({
      title:categoryModel.name,
      sanitizeName:categoryModel.sanitizeName,
      id: categoryModel.id
    });
  }
}





// loadSnippet(snippetForm: FormGroup, index: number): void {
//   snippetForm.setValue({
//     title: this.snippets[index].title,
//     body: this.snippets[index].body
//   });
// }



