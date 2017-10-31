import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { moveIn, fallIn } from '../../router.animations';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DataService } from "../data.service";

interface Users{
  Deck1;
  Deck2;
  Deck3;
  Deck4;
  Deck5;
  AccountCards;
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

interface AccountCards{
  [accountCards : string] : string;
}

interface Cards{
  attack: number;
  cost: number;
  life: number;
  name: string;
  rarity: number;
  Effects;
}

@Component({
  selector: 'edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})

export class EditDeckComponent implements OnInit{

  deck:string;

  userDoc: AngularFirestoreDocument<Users>;
  user$ : Observable<Users>;

  cardsCollectionRef: AngularFirestoreCollection<Cards>;
  cards$: Observable<Cards[]>;
  cards: Object;

  accountCardsIdsList : Array<string> = [];
  accountCardsNamesList : Array<string> = [];

  deckCardsIdsList : Array<string> = [];
  deckCardsNamesList: Array<string> = [];

  constructor(public authService: AuthService, private afs : AngularFirestore, private data: DataService) {
    this.cardsCollectionRef = this.afs.collection<Cards>('cards');
    this.cards$ = this.cardsCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Cards;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

    this.userDoc = this.afs.doc('users/'+this.authService.currentUserId);
    this.user$ = this.userDoc.valueChanges();

    this.data.currentMessage.subscribe(message => {
      this.deck = message, 
      console.log(this.deck);
      this.user$.subscribe(user => {
        //salvar a lista de cartas do baralho
        for(var i = 0; i < user[message].length; i++){
          this.deckCardsIdsList[i] = user[message][i];
        }

        console.log(this.deckCardsIdsList);

        //salvar a lista de cartas da conta
        for(var j = 0; j < user['accountCards'].length; j++){
          this.accountCardsIdsList[j] = user['accountCards'][j];
        }
        console.log(this.accountCardsIdsList);

        //salvar a lista de nomes das cartas de acordo com os ID's
        this.cards$.subscribe(cards => {
          for(var k = 0; k < this.deckCardsIdsList.length; k++){
            this.deckCardsNamesList[k] = cards['caesar']['name'];
          }
          console.log(this.deckCardsNamesList);
        });
      });
    });
  }

  ngOnInit() {
  }

  listAccountCards(){

  }

  listDeckCards(){

  }

  logout() {
    this.authService.signOut();
  }
}
