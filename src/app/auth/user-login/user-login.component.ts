import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import { moveIn } from '../../router.animations';

@Component({
  selector: 'user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class UserLoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = '';
  error: {name: string, message: string} = {name: '', message: ''};

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name: '', message: ''};
  }

  onLoginEmail(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/menu']))
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
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
