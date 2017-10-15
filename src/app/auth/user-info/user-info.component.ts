import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import { moveIn, fallIn } from '../../router.animations';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class UserInfoComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

}
