import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { moveIn, fallIn } from '../../router.animations';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

}
