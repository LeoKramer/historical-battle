import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserLoginComponent} from './auth/user-login/user-login.component';
import {UserInfoComponent} from './auth/user-info/user-info.component';
import {UserSignupComponent} from './auth/user-signup/user-signup.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: UserLoginComponent},
  {path: 'user', component: UserInfoComponent},
  {path: 'signup', component: UserSignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
