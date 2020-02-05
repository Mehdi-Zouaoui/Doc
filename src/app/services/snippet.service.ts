import {Injectable} from '@angular/core';
import {SnippetsModel} from '../models/snippets/snippets.model';
import {CategoryModel} from '../models/snippets/category.model';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})

export class SnippetService {
  modify: boolean;
  categoryId: number;
  snippets: Map<any, DocumentData> = new Map();
  snippet: Map<any, DocumentData> = new Map();
  categories: Map<string, DocumentData> = new Map();

  constructor() {}

  getData() {
    return new Promise(resolve => {
      firebase.firestore().collection('snippets')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.snippets.set(doc.id, doc.data());
          });
          resolve(this.snippets);
        });
    });
  }

  getOneData(key) {
    return firebase.firestore().collection('snippets')
      .doc(key)
      .get()
      .then((res) => {
        const data = res.data();
        this.snippet.set(res.id, data);
        return data;
      });
  }

  getCategoriesData() {
      return firebase.firestore().collection('snippetCategories')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            return this.categories.set(doc.id, doc.data());
          });
          return this.categories;
        });
  }

  updateSnippet(snippet: SnippetsModel) {
    return firebase.firestore().collection('snippets')
      .doc(snippet.sanitizeTitle)
      .update({
        title: snippet.title,
        sanitizeTitle: snippet.sanitizeTitle,
        body: snippet.body,
        categories: snippet.categories,
      });
  }

  deleteSnippet(key) {
    firebase.firestore().collection("snippets").doc(key).delete().then(function () {
      console.log('Document successfully deleted!');
    }).catch(error => {
      console.error('Error removing document: ', error);
    });
  }

  createSnippet(snippet: SnippetsModel) {
    firebase.firestore().collection('snippets').doc(snippet.sanitizeTitle).set({
      title: snippet.title,
      sanitizeTitle: snippet.sanitizeTitle,
      body: snippet.body,
      categories: snippet.categories,
    })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }

  addCategory(categoryModel: CategoryModel) {
    firebase.firestore().collection('snippetCategories').doc(categoryModel.sanitizeTitle).set({
      title: categoryModel.title,
      sanitizeTitle: categoryModel.sanitizeTitle
    })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }
}




