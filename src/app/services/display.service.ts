import {Injectable} from "@angular/core";
import {DisplayModel} from '../models/display/Display.model';
import {CategoryModel} from '../models/display/Category.model';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})

export class DisplayService {
  display: Map<any, DocumentData> = new Map();
  categories: Map<string, DocumentData> = new Map();
  subCategories: Map<string, DocumentData> = new Map();

  constructor() {}

  getData() {

        return firebase.firestore().collection('display')
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.subCategories.set(doc.id, doc.data());
            });
            return this.subCategories
          });
  }

  getOneData(key) {
    return firebase.firestore().collection('display')
      .doc(key)
      .get()
      .then((res) => {
        const data = res.data();
        this.display.set(res.id, data);
        return data;
      });
  }

  createData(item: DisplayModel) {
    firebase.firestore().collection('display')
      .doc(item.sanitizeTitle)
      .set({
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

  updateData(item: DisplayModel) {
    console.log('update display', item);
    firebase.firestore().collection("display")
      .doc(item.sanitizeTitle)
      .update({
        title: item.title,
        sanitizeTitle: item.sanitizeTitle,
        body: item.body,
        category: item.category,
      })
      .then(res => {
        console.log('Document successfully update!' , res);
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

      return firebase.firestore().collection('displayCategories')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            return this.categories.set(doc.id, doc.data());
          });
          return this.categories;
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
