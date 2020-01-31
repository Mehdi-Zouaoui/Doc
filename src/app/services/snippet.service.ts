import {Injectable} from '@angular/core';
import {SnippetsModel} from '../models/snippets/snippets.model';
import {CategoryModel} from '../models/snippets/category.model';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class SnippetService {
  modify: boolean;
  index: number;
  categoryId: number;
  snippets: Map<any, DocumentData> = new Map();
  categories: Map<string, DocumentData> = new Map();
  dataObservable: Observable<any>;

  constructor() {
  }

  getData() {
    return new Promise(resolve => {
      firebase.firestore().collection("snippets")
        .get()
        .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.snippets.set(doc.id, doc.data())
        });
        resolve(this.snippets)
      });
    })


  }

  getCategoriesData() {
    return new Promise(resolve => {
      firebase.firestore().collection('snippetCategories')
        .get()
        .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.categories.set(doc.id, doc.data());
        })
      });
      resolve(this.categories)
    })

  }

  updateData(snippet: SnippetsModel, key) {
    firebase.firestore().collection("snippets")
      .doc(key)
      .update({
      title: snippet.title,
      sanitizeTitle: snippet.sanitizeTitle,
      body: snippet.body,
      categories: snippet.categories,
    })
  }

  deleteSnippet(key) {
    firebase.firestore().collection("snippets").doc(key).delete().then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  pushDatabase(snippet: SnippetsModel) {
    firebase.firestore().collection("snippets").doc(snippet.sanitizeTitle).set({
      title: snippet.title,
      sanitizeTitle: snippet.sanitizeTitle,
      body: snippet.body,
      categories: snippet.categories,
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  pushCategoryDatabase(categoryModel: CategoryModel) {
    firebase.firestore().collection("snippetCategories").doc(categoryModel.sanitizeTitle).set({
      title: categoryModel.title,
      sanitizeTitle: categoryModel.sanitizeTitle
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
}




