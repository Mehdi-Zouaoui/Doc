import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {AuthentificationService} from "../services/authentification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthentificationService) {
  }

  authStatus: boolean;

  onSignOut() {
    this.authService.changeAuthStatus(false);
    if (!this.authStatus) {
      this.authService.signOut();
    }
  }

  ngOnInit() {
    this.authService.authStatus.subscribe(item => this.authStatus = item);
  }

}
