import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthentificationService} from "../services/authentification.service";
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {SnippetsModel} from "../models/snippets/snippets.model";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {
  constructor(
    private authService: AuthentificationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  authForm: FormGroup;
  authStatus : boolean;

  ngOnInit() {
    this.authService.authStatus.subscribe( item => this.authStatus = item);
    this.initAuthForm();
    setInterval(() => console.log(this.authStatus) , 2000)
  }

  initAuthForm() {
    this.authForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  onSubmit() {
    const formValue = this.authForm.controls;
    const entry = {
      mail: formValue.email.value,
      password: formValue.password.value
    };
    this.authService.signIn(entry.mail, entry.password, this.authStatus)
      .then((boolean: boolean) => {
        if (boolean) {
          this.authService.changeAuthStatus(true);
          this.router.navigate(['snippets']).then();
        }
      });
  }
}

