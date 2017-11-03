import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {AuthService} from './auth/auth.service';

export const firebaseConfig = environment.firebaseConfig;
import { AngularFirestoreModule } from 'angularfire2/firestore';

import {AppComponent} from './app.component';
import {UserLoginComponent} from './auth/user-login/user-login.component';
import {UserInfoComponent} from './auth/user-info/user-info.component';
import {UserSignupComponent} from './auth/user-signup/user-signup.component';
import {MainMenuComponent} from './menu/main-menu/main-menu.component';
import {DeckMenuComponent} from './menu/deck-menu/deck-menu.component';
import {EditDeckComponent} from './menu/edit-deck/edit-deck.component';
import {DialogModule} from 'primeng/primeng';

import {DataService} from './menu/data.service';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserInfoComponent,
    UserSignupComponent,
    MainMenuComponent,
    DeckMenuComponent,
    EditDeckComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DialogModule
  ],
  providers: [AuthService, AngularFireDatabase, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
