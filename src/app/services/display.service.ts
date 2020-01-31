import {DisplayModel} from '../models/display/Display.model';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import {CategoryModel} from '../models/display/Category.model';

export class DisplayService {
  displays: Map<any, DocumentData> = new Map();
  display: Map<any, DocumentData> = new Map();
  categories: Map<string, DocumentData> = new Map();
  subCategories: Map<string, DocumentData> = new Map();

  constructor() { }

  getData() {
    return new Promise<DocumentData>(
      (resolve) => {
        firebase.firestore().collection('display')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              return this.subCategories.set(doc.id, doc.data());
            });
          });
        resolve(this.subCategories);
      });
  }

  getOneData(key) {
    firebase.firestore().collection('display')
      .doc(key)
      .get()
      .then((res) => {
        this.display.set(res.id, res.data());
      });
    return this.display;
  }

  updateData(item: DisplayModel) {
    firebase.firestore().collection("display")
      .doc(item.sanitizeTitle)
      .update({
        title: item.title,
        sanitizeTitle: item.sanitizeTitle,
        body: item.body,
        category: item.category,
      })
      .then(res => {
        console.log('Document successfully written!', res);
      })
      .catch(error => {
        console.error('Error writing document: ', error);
      });
  }

  deleteDisplay(key) {
    firebase.firestore().collection("display").doc(key).delete().then(function () {
      console.log('Document successfully deleted!');
    })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  getCategoriesData() {
    return new Promise(resolve => {
      firebase.firestore().collection('displayCategories')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.categories.set(doc.id, doc.data());
          });
        });
      resolve(this.categories);
    });
  }

  addCategory(category: CategoryModel) {
    firebase.firestore().collection("displayCategories")
      .doc(category.sanitizeTitle)
      .set({
        title: category.title,
        sanitizeTitle: category.sanitizeTitle
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  emitContent() {
    // this.menusContent.next(this.menus.slice());
  }

  addContent(menu: DisplayModel) {
    // this.menus.push(menu);
    this.emitContent();
  }
}
