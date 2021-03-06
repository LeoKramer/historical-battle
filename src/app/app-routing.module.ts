import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserLoginComponent} from './auth/user-login/user-login.component';
import {UserInfoComponent} from './auth/user-info/user-info.component';
import {UserSignupComponent} from './auth/user-signup/user-signup.component';

import {MainMenuComponent} from './menu/main-menu/main-menu.component';
import {DeckMenuComponent} from './menu/deck-menu/deck-menu.component';
import {EditDeckComponent} from './menu/edit-deck/edit-deck.component';
import {BoosterMenuComponent} from './menu/booster-menu/booster-menu.component';

import {MatchComponent} from './match/match.component';
import {DefeatComponent} from './match/defeat-screen/defeat.component';
import {VictoryComponent} from './match/victory-screen/victory.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: UserLoginComponent},
  {path: 'menu', component: MainMenuComponent},
  {path: 'signup', component: UserSignupComponent},
  {path: 'decks', component: DeckMenuComponent},
  {path: 'edit', component: EditDeckComponent},
  {path: 'boosters', component: BoosterMenuComponent},
  {path: 'match', component: MatchComponent},
  {path: 'defeat', component: DefeatComponent},
  {path: 'victory', component: VictoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
