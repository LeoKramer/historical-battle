import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { moveIn, fallIn } from '../../router.animations';

@Component({
  selector: 'deck-menu',
  templateUrl: './deck-menu.component.html',
  styleUrls: ['./deck-menu.component.css']
})
export class DeckMenuComponent implements OnInit, AfterViewInit {

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
  		//image.src = "assets/images/placeholder_createdDeck.png";
  }

  ngAfterViewInit(){
  	//console.log("after view init");

  	//var image = document.getElementById("imgDeck1");
  	//console.log(image);
  }

  logout() {
    this.authService.signOut();
  }

}
