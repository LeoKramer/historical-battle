import {Component, OnInit} from '@angular/core';
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

interface Deck1{
  [deck1: string] : string;
}

interface Deck2{
  [deck2: string] : string;
}

interface Deck3{
  [deck3: string] : string;
}

interface Deck4{
  [deck4: string] : string;
}

interface Deck5{
  [deck5: string] : string;
}

interface Cards{
  attack: number;
  cost: number;
  life: number;
  name: string;
  rarity: number;
  Effects;
}

interface Effects{
  [effects: string] : string;
}

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

	userDoc: AngularFirestoreDocument<Users>;

  cardsCollectionRef: AngularFirestoreCollection<Cards>;
  cards$: Observable<Cards[]>;
  cards: Object;

  constructor(public authService: AuthService, private afs : AngularFirestore) {
    this.cardsCollectionRef = this.afs.collection<Cards>('cards');
    this.cards$ = this.cardsCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Cards;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

    if(this.userDoc == null){
      this.cards$.subscribe(data => {this.cards=data;this.firstLogin(this.cards);});
    }
  }

  ngOnInit() {
  	this.userDoc = this.afs.doc('users/'+this.authService.currentUserId);
  }

  logout() {
    this.authService.signOut();
  }

  firstLogin(cards: Object) : void{
    var cardsIds: Array<string>;
    cardsIds = [];

    var cardsIdsControl = 0;
    for(let i in cards){
      cardsIds[cardsIdsControl] = cards[i]['id'];
      cardsIds[cardsIdsControl+1] = cards[i]['id'];
      cardsIdsControl = cardsIdsControl+2;
    }

    var deck1Cards: Array<string>;
    deck1Cards = [];

    var random;
    var deck1Control = cardsIdsControl-1;
    for(var j = 0; j < 30; j++){
      random = Math.floor(Math.random() * deck1Control) + 0;
      if(cardsIds[random] != 'null'){
        deck1Cards[j] = cardsIds[random];
        cardsIds[random] = cardsIds[deck1Control];
        cardsIds[deck1Control] = "null";
        deck1Control--;
      }
    }

    deck1Cards = deck1Cards.sort((a, b) => {
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });

    this.afs.collection('users').doc(this.authService.currentUserId).set({ 
        'deck1': [deck1Cards[0], deck1Cards[1], deck1Cards[2], deck1Cards[3], deck1Cards[4], deck1Cards[5],
                  deck1Cards[6], deck1Cards[7], deck1Cards[8], deck1Cards[9], deck1Cards[10], deck1Cards[11],
                  deck1Cards[12], deck1Cards[13], deck1Cards[14], deck1Cards[15], deck1Cards[16], deck1Cards[17],
                  deck1Cards[18], deck1Cards[19], deck1Cards[20], deck1Cards[21], deck1Cards[22], deck1Cards[23],
                  deck1Cards[24], deck1Cards[25], deck1Cards[26], deck1Cards[27], deck1Cards[28], deck1Cards[29]],
        'deck2': ["vazio"],
        'deck3': ["vazio"],
        'deck4': ["vazio"],
        'deck5': ["vazio"],
        'gold': 0,
        'defaultDeck': 'deck1'});
  }
}
