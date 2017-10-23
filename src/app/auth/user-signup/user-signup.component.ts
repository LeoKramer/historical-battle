import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { moveIn, fallIn } from '../../router.animations';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class UserSignupComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(public authService: AuthService, private router: Router, private afs : AngularFirestore) {}

  ngOnInit() {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }
  
  onSignUp(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/login']))
        .catch(_error => {
          this.error = _error
        })
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Insira um Email!'
      return false
    }

    if (password.length === 0) {
      this.errorMessage = 'Insira uma senha!'
      return false
    }

    if (password.length < 6) {
      this.errorMessage = 'A senha deve possuir no mínimo 6 caracteres!'
      return false
    }

    this.errorMessage = ''

    return true
  }
}
