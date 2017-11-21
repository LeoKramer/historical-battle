import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {DialogModule} from 'primeng/primeng';
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

interface CardsOnTable{
  attack: number;
  cost: number;
  enterTurn : number;
  id : string;
  life: number;
  name: string;
  rarity: number;
  Effects;
  EffectsOver;
}

interface EffectsOver{
  [effects: string] : string;
}

interface Effects{
  [effects: string] : string;
}

interface Matches{
  player1: string;
  player1Life : number;
  player2: string;
  player2Life : number;
  currentPlayer : string;
  Player1Table;
  Player2Table;
  turn: number;
  lastAction : string;
}

interface Player1Table{
  [card: string] : CardsOnTable;
}

interface Player2Table{
  [card: string] : CardsOnTable;
}


@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css', '../menu.component.css' ]
})
export class MainMenuComponent implements OnInit {

	userDoc: AngularFirestoreDocument<Users>;
  user$ : Observable<Users>;

  matchDoc : AngularFirestoreDocument<Matches>;
  match$ : Observable<Matches>;

  cardsCollectionRef: AngularFirestoreCollection<Cards>;
  cards$: Observable<Cards[]>;
  cards: Object;

  matchesCollectionRef: AngularFirestoreCollection<Matches>;
  matches$: Observable<Matches[]>;
  matches: Object;

  matchesList : Array<Matches> = [];
  matchesListIds : Array <string> = [];

  matchInfoText : string = "";
  displayMatch : boolean = false;
  matchStatus : string = "matchNotShowing"

  playerGold : number = 0;

  constructor(public authService: AuthService, private afs : AngularFirestore, private router: Router, private data: DataService) {
    this.cardsCollectionRef = this.afs.collection<Cards>('cards');
    this.cards$ = this.cardsCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Cards;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });

    this.matchesCollectionRef = this.afs.collection<Matches>('matches');
    this.matches$ = this.matchesCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Matches;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    this.matches$.subscribe(matches => {
      this.matchesList = [];
      var matchesListTemp : Array<Matches> = [];
      for(var x = 0; x < matches.length; x++){
        matchesListTemp[x] = matches[x];
      }

      var offset = 0;
      for(var x = 0; x < matchesListTemp.length; x++){
        if(matchesListTemp[x]['player2'] == "vazio"){
          this.matchesList[offset] = matchesListTemp[x];
          offset++;
        }
      }

      this.matchDoc = this.afs.doc('matches/'+this.authService.currentUserId);
      this.match$ = this.matchDoc.valueChanges();
      this.match$.subscribe(data => {
        if(data != null){
          if(data['player2'] != "vazio"){
            this.data.changeMessage(this.authService.currentUserId);
            this.router.navigate(['/match']);
          }
        }
      });
      
    });

    this.userDoc = this.afs.doc('users/'+this.authService.currentUserId);
    this.user$ = this.userDoc.valueChanges();
    this.user$.subscribe(data => {
      console.log("checking account");
      if(data == null){
          console.log("primeiro login");
          this.playerGold = 0;
          this.cards$.subscribe(data => {this.cards=data;this.firstLogin(this.cards);});
      }
      else{
        this.playerGold = data['gold'];
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

  goToBoosters(){
    this.router.navigate(['/booster']);
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
        'accountCards': [deck1Cards[0], deck1Cards[1], deck1Cards[2], deck1Cards[3], deck1Cards[4], deck1Cards[5],
                  deck1Cards[6], deck1Cards[7], deck1Cards[8], deck1Cards[9], deck1Cards[10], deck1Cards[11],
                  deck1Cards[12], deck1Cards[13], deck1Cards[14], deck1Cards[15], deck1Cards[16], deck1Cards[17],
                  deck1Cards[18], deck1Cards[19], deck1Cards[20], deck1Cards[21], deck1Cards[22], deck1Cards[23],
                  deck1Cards[24], deck1Cards[25], deck1Cards[26], deck1Cards[27], deck1Cards[28], deck1Cards[29]],
        'gold': 0,
        'defaultDeck': 'deck1'});
  }

  createMatch(){
    var firstTable : CardsOnTable = {'attack': -1, 'cost': -1, 'enterTurn' : -1, 'id' : "vazio", 'life' : -1, 'name' : "vazio", 'rarity' : -1, 'Effects' : ["vazio"], 'EffectsOver' : ["vazio"]};

    this.afs.collection('matches').doc(this.authService.currentUserId).set({
      'player1' : this.authService.currentUserId,
      'player1Life' : 20,
      'player2' : "vazio",
      'player2Life' : 20,
      'currentPlayer' : this.authService.currentUserId,
      'Player1Table' : [firstTable, firstTable, firstTable, firstTable, firstTable],
      'Player2Table' : [firstTable, firstTable, firstTable, firstTable, firstTable],
      'turn' : 1,
      'lastAction' : "Prepare-se para a batalha!"
    });
  }

  showMatchInfo(matchId : string) : void{
    if(this.authService.currentUserId == matchId)
      this.matchInfoText = "Esta partida foi criada por você!";
    else
      this.matchInfoText = "Clique para entrar na partida!";
    
    this.displayMatch = true;
    this.matchStatus = "matchShowing"
  }

  hideMatchInfo(){
    this.displayMatch = false;
    this.matchStatus = "effectNotShowing"
  }

  enterMatch(matchId : string): void{
    if(this.authService.currentUserId != matchId){
      this.afs.collection('matches').doc(matchId).update({'player2' : this.authService.currentUserId});
      this.data.changeMessage(matchId);
      this.router.navigate(['/match']);
    }
  }
}
