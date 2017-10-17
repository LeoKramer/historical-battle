import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { moveIn, fallIn } from '../../router.animations';

@Component({
  selector: 'deck-menu',
  templateUrl: './deck-menu.component.html',
  styleUrls: ['./deck-menu.component.css']
})
export class DeckMenuComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

}
