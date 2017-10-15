import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';

import {AuthService} from './auth/auth.service';

import {AppComponent} from './app.component';
import {UserLoginComponent} from './auth/user-login/user-login.component';
import {UserInfoComponent} from './auth/user-info/user-info.component';
import {UserSignupComponent} from './auth/user-signup/user-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserInfoComponent,
    UserSignupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
