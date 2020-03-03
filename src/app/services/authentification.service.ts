import {Injectable, Input} from '@angular/core';
import {AuthService} from "./auth.service";
import * as firebase from 'firebase';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private authSource  = new BehaviorSubject<boolean>(false);
  authStatus = this.authSource.asObservable();

  changeAuthStatus(signed : boolean){
    this.authSource.next(signed);
  }
  signIn(mail, password, boolean) {
    return new Promise(resolve => {
      firebase.auth().signInWithEmailAndPassword(mail, password)
        .then(value => {
          console.log(value);
          boolean = true;
          resolve(boolean);
        })
        .catch(function (error) {
          alert("Ce compte n'existe pas verifier votre mail ou votre mot de passe");
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          boolean = false;
        })
    })

  }

  signOut() {
    firebase.auth().signOut().then(function () {

    }).catch(function (error) {

    })
  }

  constructor() {
  }


}
