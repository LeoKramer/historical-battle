import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { moveIn, fallIn } from '../../router.animations';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Users{
  Deck1;
  Deck2;
  Deck3;
  Deck4;
  Deck5;
  gold: number;
  defaultDeck: string;
}

@Component({
  selector: 'deck-menu',
  templateUrl: './deck-menu.component.html',
  styleUrls: ['./deck-menu.component.css']
})

export class DeckMenuComponent implements OnInit{
	deck1ImagePath: string = 'assets/images/placeholder_addDeck.png';
	deck2ImagePath: string = 'assets/images/placeholder_addDeck.png';
	deck3ImagePath: string = 'assets/images/placeholder_addDeck.png';
	deck4ImagePath: string = 'assets/images/placeholder_addDeck.png';
	deck5ImagePath: string = 'assets/images/placeholder_addDeck.png';

	userDoc: AngularFirestoreDocument<Users>;
	user$ : Observable<Users>;
  user: Object;

	chooseDefaultDeckTime : boolean = false;

  constructor(public authService: AuthService, private afs : AngularFirestore) {
    this.userDoc = this.afs.doc('users/'+this.authService.currentUserId);
    this.user$ = this.userDoc.valueChanges();
    this.user$.subscribe(data => {this.user = data; this.loadDecksInfo(data);});
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

  loadDecksInfo(user: Object) : void{
  	var deck = user['deck1'][0];

  	if(deck != 'vazio')
  		this.deck1ImagePath = 'assets/images/placeholder_createdDeck.png';
  	else
  		this.deck1ImagePath = 'assets/images/placeholder_addDeck.png';

  	deck = user['deck2'][0];

  	if(deck != 'vazio')
  		this.deck2ImagePath = 'assets/images/placeholder_createdDeck.png';
  	else
  		this.deck2ImagePath = 'assets/images/placeholder_addDeck.png';

  	deck = user['deck3'][0];

  	if(deck != 'vazio')
  		this.deck3ImagePath = 'assets/images/placeholder_createdDeck.png';
  	else
  		this.deck3ImagePath = 'assets/images/placeholder_addDeck.png';

  	deck = user['deck4'][0];

  	if(deck != 'vazio')
  		this.deck4ImagePath = 'assets/images/placeholder_createdDeck.png';
  	else
  		this.deck4ImagePath = 'assets/images/placeholder_addDeck.png';

  	deck = user['deck5'][0];

  	if(deck != 'vazio')
  		this.deck5ImagePath = 'assets/images/placeholder_createdDeck.png';
  	else
  		this.deck5ImagePath = 'assets/images/placeholder_addDeck.png';

  	this.loadDecksImages();
  }

  loadDecksImages(){
    switch(this.user['defaultDeck']){
      case('deck1'):
        this.deck1ImagePath = 'assets/images/placeholder_defaultDeck.png';
        break;
      case('deck2'):
        this.deck2ImagePath = 'assets/images/placeholder_defaultDeck.png';
        break;
      case('deck3'):
        this.deck3ImagePath = 'assets/images/placeholder_defaultDeck.png';
        break;
      case('deck4'):
        this.deck4ImagePath = 'assets/images/placeholder_defaultDeck.png';
        break;
      case('deck5'):
        this.deck5ImagePath = 'assets/images/placeholder_defaultDeck.png';
        break;
    }
  }

  checkClickDeck1() : void{
  	if(this.chooseDefaultDeckTime)
  		this.chooseDefaultDeck("deck1");
  	else
  		console.log("edit deck");		
  }

  checkClickDeck2() : void{
  	if(this.chooseDefaultDeckTime)
  		this.chooseDefaultDeck("deck2");
  	else
  		console.log("edit deck");		
  }

  checkClickDeck3() : void{
  	if(this.chooseDefaultDeckTime)
  		this.chooseDefaultDeck("deck3");
  	else
  		console.log("edit deck");		
  }

  checkClickDeck4() : void{
  	if(this.chooseDefaultDeckTime)
  		this.chooseDefaultDeck("deck4");
  	else
  		console.log("edit deck");		
  }

  checkClickDeck5() : void{
  	if(this.chooseDefaultDeckTime)
  		this.chooseDefaultDeck("deck5");
  	else
  		console.log("edit deck");		
  }

  defaultDeck(): void{
  	console.log("default deck");
  	this.chooseDefaultDeckTime = true;
  }

  chooseDefaultDeck(deck : string): void{
  	this.chooseDefaultDeckTime = false;
  	if(this.checkValid(this.user, deck)){
  		this.userDoc.update({ 'defaultDeck':  deck});
      this.loadDecksImages();
  	}
  }

  checkValid(user : Object, deck : string) : boolean{
  	switch(deck){
  		case('deck1'):
  			if(user['deck1'][0] == "vazio")
  				return false;
  			break;
  		case('deck2'):
  			if(user['deck2'][0] == "vazio")
  				return false;
  			break;
  		case('deck3'):
  			if(user['deck3'][0] == "vazio")
  				return false;
  			break;
  		case('deck4'):
  			if(user['deck4'][0] == "vazio")
  				return false;
  			break;
  		case('deck5'):
  			if(user['deck5'][0] == "vazio")
  				return false;
  			break;
  	}

  	return true;
  }
}
