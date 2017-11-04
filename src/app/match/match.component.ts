import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {DialogModule} from 'primeng/primeng';
import { DataService } from "../menu/data.service";

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

interface Effects{
  [effects: string] : string;
}

interface Matches{
  player1: string;
  player2: string;
  Player1Table;
  Player2Table;
  turn: number;
  currentPlayer: string;
}

interface Player1Table{
  [card: string] : cardOnTable;
}

interface Player2Table{
  [card: string] : cardOnTable;
}

interface cardOnTable{
  cardId: string;
  attack : number;
  life : number;
}

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  enemyField1ImagePath : string = 'assets/images/cardSpace.png';
  enemyField2ImagePath : string = 'assets/images/cardSpace.png';
  enemyField3ImagePath : string = 'assets/images/cardSpace.png';
  enemyField4ImagePath : string = 'assets/images/cardSpace.png';
  enemyField5ImagePath : string = 'assets/images/cardSpace.png';

  playerField1ImagePath : string = 'assets/images/cardSpace.png';
  playerField2ImagePath : string = 'assets/images/cardSpace.png';
  playerField3ImagePath : string = 'assets/images/cardSpace.png';
  playerField4ImagePath : string = 'assets/images/cardSpace.png';
  playerField5ImagePath : string = 'assets/images/cardSpace.png';

  availableBooks : string = "";
  currentPlayer : string = "";
  turn : string = "";

  matchDoc : AngularFirestoreDocument<Matches>;
  match$ : Observable<Matches>;

  userDoc: AngularFirestoreDocument<Users>;
  user$ : Observable<Users>;

  cardsCollectionRef: AngularFirestoreCollection<Cards>;
  cards$: Observable<Cards[]>;
  cardsList: Array<Cards> = [];

  deckCardsIds : Array<string> = [];
  deckCards : Array<Cards> = [];

  constructor(public authService: AuthService, private afs : AngularFirestore, private router: Router, private data: DataService) {
    this.data.currentMessage.subscribe(message => {
      console.log(message);
      this.matchDoc = this.afs.doc('matches/'+ message);
      this.match$ = this.matchDoc.valueChanges();
      this.match$.subscribe(data => {
        this.turn = data['turn'].toString();
        if(data['currentPlayer'] == data['player1'])
          this.currentPlayer = "Player 1";
        else
          this.currentPlayer = "Player 2";
      });
    });

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
    this.user$.subscribe(data => {
      var defaultdeck : string = data['defaultDeck'];
      console.log(data[defaultdeck]);
      for(var x = 0; x < data[defaultdeck].length; x++){
        this.deckCardsIds[x] = data[defaultdeck][x];
      }

      //recuperar as informações das cartas do baralho
      this.cards$.subscribe(data => {
        for(var x = 0; x < data.length; x++){
          this.cardsList[x] = data[x];
        }

        for(var x = 0; x < this.deckCardsIds.length; x++){
          for(var y = 0; y < this.cardsList.length; y++){
            if(this.cardsList[y]['id'] == this.deckCardsIds[x]){
              this.deckCards[x] = this.cardsList[y];
              break;
            }
          }
        }
      });
      
      console.log(this.cardsList);
      console.log(this.deckCards);
    });
  }

  ngOnInit() {
  }
}
