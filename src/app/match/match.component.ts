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

interface Effects{
  [effects: string] : string;
}

interface EffectsOver{
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
}

interface Player1Table{
  [card: string] : CardsOnTable;
}

interface Player2Table{
  [card: string] : CardsOnTable;
}

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  base : string = 'assets/images/card/Blue.png';
  cave : string = 'assets/images/card/Cave.png';
  curtain : string = 'assets/images/card/Red.png';
  void : string = 'assets/images/card/Void.png';

  enemyField1CardBase : string = this.base;
  enemyField1CardCave : string = this.cave;
  enemyField1CardCurtain : string = this.curtain;
  enemyField1CardVoid : string = this.void;
  enemyField1CardChar : string = "";
  enemyField1CardCost : string = "";
  enemyField1CardAttack : string = "";
  enemyField1CardLife : string = "";
  enemyField1CardName : string = "";

  enemyField2CardBase : string = this.base;
  enemyField2CardCave : string = this.cave;
  enemyField2CardCurtain : string = this.curtain;
  enemyField2CardVoid : string = this.void;
  enemyField2CardChar : string = "";
  enemyField2CardCost : string = "";
  enemyField2CardAttack : string = "";
  enemyField2CardLife : string = "";
  enemyField2CardName : string = "";

  enemyField3CardBase : string = this.base;
  enemyField3CardCave : string = this.cave;
  enemyField3CardCurtain : string = this.curtain;
  enemyField3CardVoid : string = this.void;
  enemyField3CardChar : string = "";
  enemyField3CardCost : string = "";
  enemyField3CardAttack : string = "";
  enemyField3CardLife : string = "";
  enemyField3CardName : string = "";

  enemyField4CardBase : string = this.base;
  enemyField4CardCave : string = this.cave;
  enemyField4CardCurtain : string = this.curtain;
  enemyField4CardVoid : string = this.void;
  enemyField4CardChar : string = "";
  enemyField4CardCost : string = "";
  enemyField4CardAttack : string = "";
  enemyField4CardLife : string = "";
  enemyField4CardName : string = "";

  enemyField5CardBase : string = this.base;
  enemyField5CardCave : string = this.cave;
  enemyField5CardCurtain : string = this.curtain;
  enemyField5CardVoid : string = this.void;
  enemyField5CardChar : string = "";
  enemyField5CardCost : string = "";
  enemyField5CardAttack : string = "";
  enemyField5CardLife : string = "";
  enemyField5CardName : string = "";

  playerField1CardBase : string = this.base;
  playerField1CardCave : string = this.cave;
  playerField1CardCurtain : string = this.curtain;
  playerField1CardVoid : string = this.void;
  playerField1CardChar : string = "";
  playerField1CardCost : string = "";
  playerField1CardAttack : string = "";
  playerField1CardLife : string = "";
  playerField1CardName : string = "";

  playerField2CardBase : string = this.base;
  playerField2CardCave : string = this.cave;
  playerField2CardCurtain : string = this.curtain;
  playerField2CardVoid : string = this.void;
  playerField2CardChar : string = "";
  playerField2CardCost : string = "";
  playerField2CardAttack : string = "";
  playerField2CardLife : string = "";
  playerField2CardName : string = "";

  playerField3CardBase : string = this.base;
  playerField3CardCave : string = this.cave;
  playerField3CardCurtain : string = this.curtain;
  playerField3CardVoid : string = this.void;
  playerField3CardChar : string = "";
  playerField3CardCost : string = "";
  playerField3CardAttack : string = "";
  playerField3CardLife : string = "";
  playerField3CardName : string = "";

  playerField4CardBase : string = this.base;
  playerField4CardCave : string = this.cave;
  playerField4CardCurtain : string = this.curtain;
  playerField4CardVoid : string = this.void;
  playerField4CardChar : string = "";
  playerField4CardCost : string = "";
  playerField4CardAttack : string = "";
  playerField4CardLife : string = "";
  playerField4CardName : string = "";

  playerField5CardBase : string = this.base;
  playerField5CardCave : string = this.cave;
  playerField5CardCurtain : string = this.curtain;
  playerField5CardVoid : string = this.void;
  playerField5CardChar : string = "";
  playerField5CardCost : string = "";
  playerField5CardAttack : string = "";
  playerField5CardLife : string = "";
  playerField5CardName : string = "";

  playerHand1CardBase : string = 'assets/images/card/Blue.png';
  playerHand1CardCave : string = 'assets/images/card/Cave.png';
  playerHand1CardCurtain : string = 'assets/images/card/Red.png';
  playerHand1CardVoid : string = 'assets/images/card/Void.png';
  playerHand1CardChar : string = 'assets/images/card/chars/default.png';
  playerHand1CardCost : string = 'assets/images/card/GoldLevel.png';
  playerHand1CardAttack : string = 'assets/images/card/Markers.png';
  playerHand1CardLife : string = 'assets/images/card/Markers.png';
  playerHand1CardName : string = 'assets/images/card/NameSign.png';

  playerHand2CardBase : string = 'assets/images/card/Blue.png';
  playerHand2CardCave : string = 'assets/images/card/Cave.png';
  playerHand2CardCurtain : string = 'assets/images/card/Red.png';
  playerHand2CardVoid : string = 'assets/images/card/Void.png';
  playerHand2CardChar : string = 'assets/images/card/chars/default.png';
  playerHand2CardCost : string = 'assets/images/card/GoldLevel.png';
  playerHand2CardAttack : string = 'assets/images/card/Markers.png';
  playerHand2CardLife : string = 'assets/images/card/Markers.png';
  playerHand2CardName : string = 'assets/images/card/NameSign.png';

  playerHand3CardBase : string = 'assets/images/card/Blue.png';
  playerHand3CardCave : string = 'assets/images/card/Cave.png';
  playerHand3CardCurtain : string = 'assets/images/card/Red.png';
  playerHand3CardVoid : string = 'assets/images/card/Void.png';
  playerHand3CardChar : string = 'assets/images/card/chars/default.png';
  playerHand3CardCost : string = 'assets/images/card/GoldLevel.png';
  playerHand3CardAttack : string = 'assets/images/card/Markers.png';
  playerHand3CardLife : string = 'assets/images/card/Markers.png';
  playerHand3CardName : string = 'assets/images/card/NameSign.png';

  playerHand4CardBase : string = 'assets/images/card/Blue.png';
  playerHand4CardCave : string = 'assets/images/card/Cave.png';
  playerHand4CardCurtain : string = 'assets/images/card/Red.png';
  playerHand4CardVoid : string = 'assets/images/card/Void.png';
  playerHand4CardChar : string = 'assets/images/card/chars/default.png';
  playerHand4CardCost : string = 'assets/images/card/GoldLevel.png';
  playerHand4CardAttack : string = 'assets/images/card/Markers.png';
  playerHand4CardLife : string = 'assets/images/card/Markers.png';
  playerHand4CardName : string = 'assets/images/card/NameSign.png';

  playerHand5CardBase : string = 'assets/images/card/Blue.png';
  playerHand5CardCave : string = 'assets/images/card/Cave.png';
  playerHand5CardCurtain : string = 'assets/images/card/Red.png';
  playerHand5CardVoid : string = 'assets/images/card/Void.png';
  playerHand5CardChar : string = 'assets/images/card/chars/default.png';
  playerHand5CardCost : string = 'assets/images/card/GoldLevel.png';
  playerHand5CardAttack : string = 'assets/images/card/Markers.png';
  playerHand5CardLife : string = 'assets/images/card/Markers.png';
  playerHand5CardName : string = 'assets/images/card/NameSign.png';

  enemyLife : number = 20;
  playerLife : number = 20;
  availableBooks : number = 0;
  currentPlayer : string = "";
  turn : number = 0;

  matchDoc : AngularFirestoreDocument<Matches>;
  match$ : Observable<Matches>;
  matchId : string = "";

  userDoc: AngularFirestoreDocument<Users>;
  user$ : Observable<Users>;

  cardsCollectionRef: AngularFirestoreCollection<Cards>;
  cards$: Observable<Cards[]>;
  cardsList: Array<Cards> = [];

  deckCardsIds : Array<string> = [];
  deckCards : Array<Cards> = [];
  matchCards: Array<Cards> = [];

  randomCard : Cards = null;
  randomNumber: number = 0;
  tempDeckCards : Array<Cards> = [];

  cardsOnHand : Array<Cards> = [];
  lastCardGot : number = 0;

  whoIsThisPlayer: string = "";

  matchPlayer1 : string = "";
  matchPlayer2 : string = "";

  playerTable : Array<CardsOnTable> = [];
  enemyTable: Array<CardsOnTable> = [];

  attackingCard : CardsOnTable = null;
  attackingCardPosition : number = -1;
  targetCardForAttack : CardsOnTable = null;

  //se a carta da posição do vetor equivalente a posição do campo atacou, muda para 1, senão é 0
  cardsThatAttackedThisTurn : Array<number> = [0, 0, 0, 0, 0];

  constructor(public authService: AuthService, private afs : AngularFirestore, private router: Router, private data: DataService) {
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
      console.log(message);
      this.matchId = message;
      this.matchDoc = this.afs.doc('matches/'+ message);
      this.match$ = this.matchDoc.valueChanges();
      this.match$.subscribe(data => {
            //verifique o turno
            if(data['turn'] != this.turn){
              this.turn = data['turn'];
              this.availableBooks = this.turn;
            }
            
            this.matchPlayer1 = data['player1'];
            this.matchPlayer2 = data['player2'];

            //verifique quem é esse jogador 
            if(data['player1'] == this.authService.currentUserId)
              this.whoIsThisPlayer = "Player1";
            else
              this.whoIsThisPlayer = "Player2";
            //verifique de qual player é o turno
            if(data['currentPlayer'] == data['player1'] && data['player1'] == this.authService.currentUserId)
              this.currentPlayer = "Seu turno";
            else if(data['currentPlayer'] == data['player2'] && data['player2'] == this.authService.currentUserId)
              this.currentPlayer = "Seu turno";
            else
              this.currentPlayer = "Turno do oponente";

            //verifique a vida de cada jogador
            if(data['player1'] == this.authService.currentUserId){
              this.enemyLife = data['player2Life'];
              this.playerLife = data['player1Life'];
            }
            else{
              this.enemyLife = data['player1Life'];
              this.playerLife = data['player2Life'];
            }

            //verificar o campo
            for(var x = 0; x < 5; x++){
              if(this.whoIsThisPlayer == "Player1"){
                this.playerTable[x] = data['Player1Table'][x];
                this.enemyTable[x] = data['Player2Table'][x];
              }
              else{
                this.playerTable[x] = data['Player2Table'][x];
                this.enemyTable[x] = data['Player1Table'][x];
              }
            }
            var char : string = "";
            var cost : string = "";
            var attack : string = "";
            var life : string = "";
            var name : string = "";

            char = 'assets/images/card/chars/default.png';
            cost = 'assets/images/card/GoldLevel.png';
            attack = 'assets/images/card/Markers.png';
            life = 'assets/images/card/Markers.png';
            name = 'assets/images/card/NameSign.png';

            if(data['player1'] == this.authService.currentUserId){
              if(data['Player1Table'][0]['name'] == "vazio"){
                this.playerField1CardChar = char;
                this.playerField1CardCost = cost;
                this.playerField1CardAttack = attack;
                this.playerField1CardLife = life;
                this.playerField1CardName = name;
              }
              else{
                this.playerField1CardChar = 'assets/images/card/chars/'+data['Player1Table'][0]['id']+'.png';
                this.playerField1CardCost = 'assets/images/card/costs/'+data['Player1Table'][0]['cost']+'.png';
                this.playerField1CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][0]['attack']+'.png';
                this.playerField1CardLife = 'assets/images/card/lifes/'+data['Player1Table'][0]['life']+'.png';
                this.playerField1CardName = 'assets/images/card/names/'+data['Player1Table'][0]['id']+'.png';
              }

              if(data['Player1Table'][1]['name'] == "vazio"){
                this.playerField2CardChar = char;
                this.playerField2CardCost = cost;
                this.playerField2CardAttack = attack;
                this.playerField2CardLife = life;
                this.playerField2CardName = name;
              }
              else{
                this.playerField2CardChar = 'assets/images/card/chars/'+data['Player1Table'][1]['id']+'.png';
                this.playerField2CardCost = 'assets/images/card/costs/'+data['Player1Table'][1]['cost']+'.png';
                this.playerField2CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][1]['attack']+'.png';
                this.playerField2CardLife = 'assets/images/card/lifes/'+data['Player1Table'][1]['life']+'.png';
                this.playerField2CardName = 'assets/images/card/names/'+data['Player1Table'][1]['id']+'.png';
              }

              if(data['Player1Table'][2]['name'] == "vazio"){
                this.playerField3CardChar = char;
                this.playerField3CardCost = cost;
                this.playerField3CardAttack = attack;
                this.playerField3CardLife = life;
                this.playerField3CardName = name;
              }
              else{
                this.playerField3CardChar = 'assets/images/card/chars/'+data['Player1Table'][2]['id']+'.png';
                this.playerField3CardCost = 'assets/images/card/costs/'+data['Player1Table'][2]['cost']+'.png';
                this.playerField3CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][2]['attack']+'.png';
                this.playerField3CardLife = 'assets/images/card/lifes/'+data['Player1Table'][2]['life']+'.png';
                this.playerField3CardName = 'assets/images/card/names/'+data['Player1Table'][2]['id']+'.png';
              }

              if(data['Player1Table'][3]['name'] == "vazio"){
                this.playerField4CardChar = char;
                this.playerField4CardCost = cost;
                this.playerField4CardAttack = attack;
                this.playerField4CardLife = life;
                this.playerField4CardName = name;
              }
              else{
                this.playerField4CardChar = 'assets/images/card/chars/'+data['Player1Table'][3]['id']+'.png';
                this.playerField4CardCost = 'assets/images/card/costs/'+data['Player1Table'][3]['cost']+'.png';
                this.playerField4CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][3]['attack']+'.png';
                this.playerField4CardLife = 'assets/images/card/lifes/'+data['Player1Table'][3]['life']+'.png';
                this.playerField4CardName = 'assets/images/card/names/'+data['Player1Table'][3]['id']+'.png';

              }

              if(data['Player1Table'][4]['name'] == "vazio"){
                this.playerField5CardChar = char;
                this.playerField5CardCost = cost;
                this.playerField5CardAttack = attack;
                this.playerField5CardLife = life;
                this.playerField5CardName = name;
              }
              else{
                this.playerField5CardChar = 'assets/images/card/chars/'+data['Player1Table'][4]['id']+'.png';
                this.playerField5CardCost = 'assets/images/card/costs/'+data['Player1Table'][4]['cost']+'.png';
                this.playerField5CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][4]['attack']+'.png';
                this.playerField5CardLife = 'assets/images/card/lifes/'+data['Player1Table'][4]['life']+'.png';
                this.playerField5CardName = 'assets/images/card/names/'+data['Player1Table'][4]['id']+'.png';
              }

              if(data['Player2Table'][0]['name'] == "vazio"){
                this.enemyField1CardChar = char;
                this.enemyField1CardCost = cost;
                this.enemyField1CardAttack = attack;
                this.enemyField1CardLife = life;
                this.enemyField1CardName = name;
              }
              else{
                this.enemyField1CardChar = 'assets/images/card/chars/'+data['Player2Table'][0]['id']+'.png';
                this.enemyField1CardCost = 'assets/images/card/costs/'+data['Player2Table'][0]['cost']+'.png';
                this.enemyField1CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][0]['attack']+'.png';
                this.enemyField1CardLife = 'assets/images/card/lifes/'+data['Player2Table'][0]['life']+'.png';
                this.enemyField1CardName = 'assets/images/card/names/'+data['Player2Table'][0]['id']+'.png';
              }

              if(data['Player2Table'][1]['name'] == "vazio"){
                this.enemyField2CardChar = char;
                this.enemyField2CardCost = cost;
                this.enemyField2CardAttack = attack;
                this.enemyField2CardLife = life;
                this.enemyField2CardName = name;
              }
              else{
                this.enemyField2CardChar = 'assets/images/card/chars/'+data['Player2Table'][1]['id']+'.png';
                this.enemyField2CardCost = 'assets/images/card/costs/'+data['Player2Table'][1]['cost']+'.png';
                this.enemyField2CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][1]['attack']+'.png';
                this.enemyField2CardLife = 'assets/images/card/lifes/'+data['Player2Table'][1]['life']+'.png';
                this.enemyField2CardName = 'assets/images/card/names/'+data['Player2Table'][1]['id']+'.png';
              }

              if(data['Player2Table'][2]['name'] == "vazio"){
                this.enemyField3CardChar = char;
                this.enemyField3CardCost = cost;
                this.enemyField3CardAttack = attack;
                this.enemyField3CardLife = life;
                this.enemyField3CardName = name;
              }
              else{
                this.enemyField3CardChar = 'assets/images/card/chars/'+data['Player2Table'][2]['id']+'.png';
                this.enemyField3CardCost = 'assets/images/card/costs/'+data['Player2Table'][2]['cost']+'.png';
                this.enemyField3CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][2]['attack']+'.png';
                this.enemyField3CardLife = 'assets/images/card/lifes/'+data['Player2Table'][2]['life']+'.png';
                this.enemyField3CardName = 'assets/images/card/names/'+data['Player2Table'][2]['id']+'.png';

              }

              if(data['Player2Table'][3]['name'] == "vazio"){
                this.enemyField4CardChar = char;
                this.enemyField4CardCost = cost;
                this.enemyField4CardAttack = attack;
                this.enemyField4CardLife = life;
                this.enemyField4CardName = name;
              }
              else{
                this.enemyField4CardChar = 'assets/images/card/chars/'+data['Player2Table'][3]['id']+'.png';
                this.enemyField4CardCost = 'assets/images/card/costs/'+data['Player2Table'][3]['cost']+'.png';
                this.enemyField4CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][3]['attack']+'.png';
                this.enemyField4CardLife = 'assets/images/card/lifes/'+data['Player2Table'][3]['life']+'.png';
                this.enemyField4CardName = 'assets/images/card/names/'+data['Player2Table'][3]['id']+'.png';
              }

              if(data['Player2Table'][4]['name'] == "vazio"){
                this.enemyField5CardChar = char;
                this.enemyField5CardCost = cost;
                this.enemyField5CardAttack = attack;
                this.enemyField5CardLife = life;
                this.enemyField5CardName = name;
              }
              else{
                this.enemyField5CardChar = 'assets/images/card/chars/'+data['Player2Table'][4]['id']+'.png';
                this.enemyField5CardCost = 'assets/images/card/costs/'+data['Player2Table'][4]['cost']+'.png';
                this.enemyField5CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][4]['attack']+'.png';
                this.enemyField5CardLife = 'assets/images/card/lifes/'+data['Player2Table'][4]['life']+'.png';
                this.enemyField5CardName = 'assets/images/card/names/'+data['Player2Table'][4]['id']+'.png';
              }
            }
            else if(data['player2'] == this.authService.currentUserId){
              if(data['Player2Table'][0]['name'] == "vazio"){
                this.playerField1CardChar = char;
                this.playerField1CardCost = cost;
                this.playerField1CardAttack = attack;
                this.playerField1CardLife = life;
                this.playerField1CardName = name;
              }
              else{
                this.playerField1CardChar = 'assets/images/card/chars/'+data['Player2Table'][0]['id']+'.png';
                this.playerField1CardCost = 'assets/images/card/costs/'+data['Player2Table'][0]['cost']+'.png';
                this.playerField1CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][0]['attack']+'.png';
                this.playerField1CardLife = 'assets/images/card/lifes/'+data['Player2Table'][0]['life']+'.png';
                this.playerField1CardName = 'assets/images/card/names/'+data['Player2Table'][0]['id']+'.png';
              }

              if(data['Player2Table'][1]['name'] == "vazio"){
                this.playerField2CardChar = char;
                this.playerField2CardCost = cost;
                this.playerField2CardAttack = attack;
                this.playerField2CardLife = life;
                this.playerField2CardName = name;
              }
              else{
                this.playerField2CardChar = 'assets/images/card/chars/'+data['Player2Table'][1]['id']+'.png';
                this.playerField2CardCost = 'assets/images/card/costs/'+data['Player2Table'][1]['cost']+'.png';
                this.playerField2CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][1]['attack']+'.png';
                this.playerField2CardLife = 'assets/images/card/lifes/'+data['Player2Table'][1]['life']+'.png';
                this.playerField2CardName = 'assets/images/card/names/'+data['Player2Table'][1]['id']+'.png';
              }

              if(data['Player2Table'][2]['name'] == "vazio"){
                this.playerField3CardChar = char;
                this.playerField3CardCost = cost;
                this.playerField3CardAttack = attack;
                this.playerField3CardLife = life;
                this.playerField3CardName = name;
              }
              else{
                this.playerField3CardChar = 'assets/images/card/chars/'+data['Player2Table'][2]['id']+'.png';
                this.playerField3CardCost = 'assets/images/card/costs/'+data['Player2Table'][2]['cost']+'.png';
                this.playerField3CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][2]['attack']+'.png';
                this.playerField3CardLife = 'assets/images/card/lifes/'+data['Player2Table'][2]['life']+'.png';
                this.playerField3CardName = 'assets/images/card/names/'+data['Player2Table'][2]['id']+'.png';
              }

              if(data['Player2Table'][3]['name'] == "vazio"){
                this.playerField4CardChar = char;
                this.playerField4CardCost = cost;
                this.playerField4CardAttack = attack;
                this.playerField4CardLife = life;
                this.playerField4CardName = name;
              }
              else{
                this.playerField4CardChar = 'assets/images/card/chars/'+data['Player2Table'][3]['id']+'.png';
                this.playerField4CardCost = 'assets/images/card/costs/'+data['Player2Table'][3]['cost']+'.png';
                this.playerField4CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][3]['attack']+'.png';
                this.playerField4CardLife = 'assets/images/card/lifes/'+data['Player2Table'][3]['life']+'.png';
                this.playerField4CardName = 'assets/images/card/names/'+data['Player2Table'][3]['id']+'.png';
              }

              if(data['Player2Table'][4]['name'] == "vazio"){
                this.playerField5CardChar = char;
                this.playerField5CardCost = cost;
                this.playerField5CardAttack = attack;
                this.playerField5CardLife = life;
                this.playerField5CardName = name;
              }
              else{
                this.playerField5CardChar = 'assets/images/card/chars/'+data['Player2Table'][4]['id']+'.png';
                this.playerField5CardCost = 'assets/images/card/costs/'+data['Player2Table'][4]['cost']+'.png';
                this.playerField5CardAttack = 'assets/images/card/attacks/'+data['Player2Table'][4]['attack']+'.png';
                this.playerField5CardLife = 'assets/images/card/lifes/'+data['Player2Table'][4]['life']+'.png';
                this.playerField5CardName = 'assets/images/card/names/'+data['Player2Table'][4]['id']+'.png';
              }

              if(data['Player1Table'][0]['name'] == "vazio"){
                this.enemyField1CardChar = char;
                this.enemyField1CardCost = cost;
                this.enemyField1CardAttack = attack;
                this.enemyField1CardLife = life;
                this.enemyField1CardName = name;
              }
              else{
                this.enemyField1CardChar = 'assets/images/card/chars/'+data['Player1Table'][0]['id']+'.png';
                this.enemyField1CardCost = 'assets/images/card/costs/'+data['Player1Table'][0]['cost']+'.png';
                this.enemyField1CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][0]['attack']+'.png';
                this.enemyField1CardLife = 'assets/images/card/lifes/'+data['Player1Table'][0]['life']+'.png';
                this.enemyField1CardName = 'assets/images/card/names/'+data['Player1Table'][0]['id']+'.png';
              }

              if(data['Player1Table'][1]['name'] == "vazio"){
                this.enemyField2CardChar = char;
                this.enemyField2CardCost = cost;
                this.enemyField2CardAttack = attack;
                this.enemyField2CardLife = life;
                this.enemyField2CardName = name;
              }
              else{
                this.enemyField2CardChar = 'assets/images/card/chars/'+data['Player1Table'][1]['id']+'.png';
                this.enemyField2CardCost = 'assets/images/card/costs/'+data['Player1Table'][1]['cost']+'.png';
                this.enemyField2CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][1]['attack']+'.png';
                this.enemyField2CardLife = 'assets/images/card/lifes/'+data['Player1Table'][1]['life']+'.png';
                this.enemyField2CardName = 'assets/images/card/names/'+data['Player1Table'][1]['id']+'.png';
              }
                
              if(data['Player1Table'][2]['name'] == "vazio"){
                this.enemyField3CardChar = char;
                this.enemyField3CardCost = cost;
                this.enemyField3CardAttack = attack;
                this.enemyField3CardLife = life;
                this.enemyField3CardName = name;
              }
              else{
                this.enemyField3CardChar = 'assets/images/card/chars/'+data['Player1Table'][2]['id']+'.png';
                this.enemyField3CardCost = 'assets/images/card/costs/'+data['Player1Table'][2]['cost']+'.png';
                this.enemyField3CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][2]['attack']+'.png';
                this.enemyField3CardLife = 'assets/images/card/lifes/'+data['Player1Table'][2]['life']+'.png';
                this.enemyField3CardName = 'assets/images/card/names/'+data['Player1Table'][2]['id']+'.png';
              }
                
              if(data['Player1Table'][3]['name'] == "vazio"){
                this.enemyField4CardChar = char;
                this.enemyField4CardCost = cost;
                this.enemyField4CardAttack = attack;
                this.enemyField4CardLife = life;
                this.enemyField4CardName = name;
              }
              else{
                this.enemyField4CardChar = 'assets/images/card/chars/'+data['Player1Table'][3]['id']+'.png';
                this.enemyField4CardCost = 'assets/images/card/costs/'+data['Player1Table'][3]['cost']+'.png';
                this.enemyField4CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][3]['attack']+'.png';
                this.enemyField4CardLife = 'assets/images/card/lifes/'+data['Player1Table'][3]['life']+'.png';
                this.enemyField4CardName = 'assets/images/card/names/'+data['Player1Table'][3]['id']+'.png';
              }

              if(data['Player1Table'][4]['name'] == "vazio"){
                this.enemyField5CardChar = char;
                this.enemyField5CardCost = cost;
                this.enemyField5CardAttack = attack;
                this.enemyField5CardLife = life;
                this.enemyField5CardName = name;
              }
              else{
                this.enemyField5CardChar = 'assets/images/card/chars/'+data['Player1Table'][4]['id']+'.png';
                this.enemyField5CardCost = 'assets/images/card/costs/'+data['Player1Table'][4]['cost']+'.png';
                this.enemyField5CardAttack = 'assets/images/card/attacks/'+data['Player1Table'][4]['attack']+'.png';
                this.enemyField5CardLife = 'assets/images/card/lifes/'+data['Player1Table'][4]['life']+'.png';
                this.enemyField5CardName = 'assets/images/card/names/'+data['Player1Table'][4]['id']+'.png';
              }
            }

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

            //gerar as cartas da partida
            console.log(this.cardsList);
            console.log(this.deckCards);

            //gerar as cartas da partida
            this.tempDeckCards = this.deckCards;
            var offset = 0
            for(var x = 29; x >= 0; x--){
              this.randomNumber = Math.floor((Math.random() * x) + 0);
              this.randomCard = this.tempDeckCards[this.randomNumber];
              this.tempDeckCards[this.randomNumber] = this.tempDeckCards[x];
              this.tempDeckCards[x] = this.randomCard;
              this.matchCards[offset] = this.randomCard; 
              offset++;
            }

            //coloque as cartas na mão do jogador
            console.log(this.matchCards);
            if(this.turn == 1){
              this.playerHand1CardChar = 'assets/images/card/chars/'+this.matchCards[0]['id']+'.png';
              this.playerHand1CardCost = 'assets/images/card/costs/'+this.matchCards[0]['cost']+'.png';
              this.playerHand1CardAttack = 'assets/images/card/attacks/'+this.matchCards[0]['attack']+'.png';
              this.playerHand1CardLife = 'assets/images/card/lifes/'+this.matchCards[0]['life']+'.png';
              this.playerHand1CardName = 'assets/images/card/names/'+this.matchCards[0]['id']+'.png';

              this.playerHand2CardChar = 'assets/images/card/chars/'+this.matchCards[1]['id']+'.png';
              this.playerHand2CardCost = 'assets/images/card/costs/'+this.matchCards[1]['cost']+'.png';
              this.playerHand2CardAttack = 'assets/images/card/attacks/'+this.matchCards[1]['attack']+'.png';
              this.playerHand2CardLife = 'assets/images/card/lifes/'+this.matchCards[1]['life']+'.png';
              this.playerHand2CardName = 'assets/images/card/names/'+this.matchCards[1]['id']+'.png';

              this.playerHand3CardChar = 'assets/images/card/chars/'+this.matchCards[2]['id']+'.png';
              this.playerHand3CardCost = 'assets/images/card/costs/'+this.matchCards[2]['cost']+'.png';
              this.playerHand3CardAttack = 'assets/images/card/attacks/'+this.matchCards[2]['attack']+'.png';
              this.playerHand3CardLife = 'assets/images/card/lifes/'+this.matchCards[2]['life']+'.png';
              this.playerHand3CardName = 'assets/images/card/names/'+this.matchCards[2]['id']+'.png';

              this.playerHand4CardChar = 'assets/images/card/chars/'+this.matchCards[3]['id']+'.png';
              this.playerHand4CardCost = 'assets/images/card/costs/'+this.matchCards[3]['cost']+'.png';
              this.playerHand4CardAttack = 'assets/images/card/attacks/'+this.matchCards[3]['attack']+'.png';
              this.playerHand4CardLife = 'assets/images/card/lifes/'+this.matchCards[3]['life']+'.png';
              this.playerHand4CardName = 'assets/images/card/names/'+this.matchCards[3]['id']+'.png';

              this.playerHand5CardChar = 'assets/images/card/chars/'+this.matchCards[4]['id']+'.png';
              this.playerHand5CardCost = 'assets/images/card/costs/'+this.matchCards[4]['cost']+'.png';
              this.playerHand5CardAttack = 'assets/images/card/attacks/'+this.matchCards[4]['attack']+'.png';
              this.playerHand5CardLife = 'assets/images/card/lifes/'+this.matchCards[4]['life']+'.png';
              this.playerHand5CardName = 'assets/images/card/names/'+this.matchCards[4]['id']+'.png';

              this.lastCardGot = 4;
              for(var x = 0; x < 5; x++){
                this.cardsOnHand[x] = this.matchCards[x];
              }
            }
          }); 
        });
      });
    });
  }

  ngOnInit() {
  }
  
  tryToCastFromHand(field : number) : void{
    if(this.currentPlayer != "Seu turno")
      return;

    console.log("try to cast from hand from field " + field);
    console.log(this.cardsOnHand);
    console.log("last card got from deck " + this.lastCardGot);

    console.log(handCard);
    var fieldSpacePosition = -1;
    console.log(this.playerTable);
    if(this.cardsOnHand[field]['cost'] <= this.availableBooks && this.cardsOnHand[field]['cost'] != -1){
      this.availableBooks--;
      for(var x = 0; x < 5; x++){
        if(this.playerTable[x]['id'] == "vazio"){
          fieldSpacePosition = x;
          break;
        }
      }

      if(fieldSpacePosition == -1)
        return;

      var handCard : CardsOnTable = {'attack': this.cardsOnHand[field]['attack'], 'cost': this.cardsOnHand[field]['cost'], 
                              'enterTurn' : this.turn, 'id' : this.cardsOnHand[field]['id'], 
                              'life' : this.cardsOnHand[field]['life'], 'name' : this.cardsOnHand[field]['name'], 
                              'rarity' : this.cardsOnHand[field]['rarity'], 'Effects' : this.cardsOnHand[field]['effects'],
                              'EffectsOver' : ["vazio"]};

      console.log(fieldSpacePosition);

      this.playerTable[fieldSpacePosition] = handCard;

      this.updatePlayerTableOnPosition(fieldSpacePosition, handCard);

      this.castCardEffect(fieldSpacePosition);

      var emptyCard : CardsOnTable = {'attack': -1, 'cost': -1, 'enterTurn' : -1, 'id' : "vazio", 'life' : -1, 'name' : "vazio", 'rarity' : -1, 'Effects' : ["vazio"], 'EffectsOver' : ["vazio"]};

      for(var x = field; x < 4; x++){
        this.cardsOnHand[x] = this.cardsOnHand[x+1];
      }

      this.cardsOnHand[4] = emptyCard;
      this.setHandCardsImages();
    }
  }

  castCardEffect(field : number) : void{
    var fieldCard : CardsOnTable = this.playerTable[field];
    for(var x = 0; x < fieldCard['Effects'].length; x++){
      switch(fieldCard['Effects'][x]){
        case("charm"):
          this.charm(field);
          break;
        case("command"):
          this.command();
          break;
        case("emancipate"):
          this.emancipate();
          break;
        case("facism"):
          this.facism();
          break;
        case("holocaust"):
          this.holocaust(field);
          break;
        case("hypnosis"):
          this.hypnosis();
          break;
        case("invent"):
          this.invent();
          break;
        case("pacifism"):
          this.pacifism();
          break;
        case("paint"):
          this.paint();
          break;
        case("performance"):
          this.performance();
          break;
        case("purge"):
          this.purge();
          break;
        default:
          break;
      }
    }
  }

  getARandomPlayerCardOnTablePosition() : number{
    var randomPosition = Math.floor(Math.random() * (this.playerTable.length-1)) + 0;

    var chances = 0;
    while(this.playerTable[randomPosition]['name'] == "vazio" && chances < 3){
      //tente pegar tres vezes uma posicao aleatoria
      var randomPosition = Math.floor(Math.random() * (this.playerTable.length-1)) + 0;
      chances++;
    }

    if(this.playerTable[randomPosition]['name'] == "vazio"){
      randomPosition = -1;
      //se ainda não conseguiu uma carta não vazia, pegue a primeira não vazia na ordem
      for(var x = 0; x < this.playerTable.length; x++){
        if(this.playerTable[x]['name'] != "vazio"){
          randomPosition = x;
          break;
        }
      }
    }

    return randomPosition;
  }

  getARandomEnemyCardOnTablePosition() : number{
    var randomPosition = Math.floor(Math.random() * (this.enemyTable.length-1)) + 0;

    var chances = 0;
    while(this.enemyTable[randomPosition]['name'] == "vazio" && chances < 3){
      //tente pegar tres vezes uma posicao aleatoria
      var randomPosition = Math.floor(Math.random() * (this.enemyTable.length-1)) + 0;
      chances++;
    }

    if(this.enemyTable[randomPosition]['name'] == "vazio"){
      randomPosition = -1;
      //se ainda não conseguiu uma carta não vazia, pegue a primeira não vazia na ordem
      for(var x = 0; x < this.enemyTable.length; x++){
        if(this.enemyTable[x]['name'] != "vazio"){
          randomPosition = x;
          break;
        }
      }
    }

    return randomPosition;
  }

  charm(field : number) : void{
    var targetPosition : number = this.getARandomEnemyCardOnTablePosition();

    if(targetPosition == -1)
      return;

     
    var targetCard : CardsOnTable = this.enemyTable[targetPosition];

    var charmEffect : string = "charmedByEnemyCardOnPosition" + field;

    for(var x = 0; x < targetCard['EffectsOver'].length; x++){
      if(targetCard['EffectsOver'][x] == "vazio"){
        targetCard['EffectsOver'][x] = charmEffect;
        break; 
      }
    }
    
    this.enemyTable[targetPosition] = targetCard;
    this.updateEnemyTableOnPosition(targetPosition, targetCard);
  }

  command() : void{
    for(var x = 0; x < this.playerTable.length; x++){
      if(this.playerTable[x]['name'] != "vazio"){
        this.playerTable[x]['attack'] += 1;
      }
    }

    for(var x = 0; x < this.playerTable.length; x++){
      this.updatePlayerTableOnPosition(x, this.playerTable[x]);
    }
  }

  emancipate() : void{
    var newPlayerTable : Array<CardsOnTable> = this.playerTable;
    var newEnemyTable : Array<CardsOnTable> = this.enemyTable;

    for(var x = 0; x < newPlayerTable.length; x++){
      if(newPlayerTable[x]['name'] != "vazio"){
        for(var y = 0; y < this.cardsList.length; y++){
          if(this.cardsList[y]['id'] == newPlayerTable[x]['id']){
            newPlayerTable[x] = {'attack': this.cardsList[y]['attack'], 'cost': this.cardsList[y]['cost'], 
                                'enterTurn' : this.turn, 'id' : this.cardsList[y]['id'], 
                                'life' : this.cardsList[y]['life'], 'name' : this.cardsList[y]['name'], 
                                'rarity' : this.cardsList[y]['rarity'], 'Effects' : this.cardsList[y]['effects'],
                                'EffectsOver' : ["vazio"]};
            break;
          }
        }
      }
    }

    for(var x = 0; x < newEnemyTable.length; x++){
      if(newEnemyTable[x]['name'] != "vazio"){
        for(var y = 0; y < this.cardsList.length; y++){
          if(this.cardsList[y]['id'] == newEnemyTable[x]['id']){
            newEnemyTable[x] = {'attack': this.cardsList[y]['attack'], 'cost': this.cardsList[y]['cost'], 
                                'enterTurn' : this.turn, 'id' : this.cardsList[y]['id'], 
                                'life' : this.cardsList[y]['life'], 'name' : this.cardsList[y]['name'], 
                                'rarity' : this.cardsList[y]['rarity'], 'Effects' : this.cardsList[y]['effects'],
                                'EffectsOver' : ["vazio"]};
            break;
          }
        }
      }
    }

    this.playerTable = newPlayerTable;
    for(var x = 0; x < this.playerTable.length; x++){
      this.updatePlayerTableOnPosition(x, this.playerTable[x]);
    }

    this.enemyTable = newEnemyTable;
    for(var x = 0; x < this.enemyTable.length; x++){
      this.updateEnemyTableOnPosition(x, this.enemyTable[x]);
    }
  }

  facism(){
    var greatestAttack : number = -1;
    var greatestAttackPosition : number = -1;
    var emptyCard : CardsOnTable = {'attack': -1, 'cost': -1, 'enterTurn' : -1, 'id' : "vazio", 'life' : -1, 'name' : "vazio", 'rarity' : -1, 'Effects' : ["vazio"], 'EffectsOver' : ["vazio"]};

    for(var x = 0; x < this.enemyTable.length; x++){
      if(this.enemyTable[x]['attack'] > greatestAttack){
        greatestAttack = this.enemyTable[x]['attack'];
        greatestAttackPosition = x;
      }
    }

    if(greatestAttack != -1){
      this.enemyTable[greatestAttackPosition] = emptyCard;
      this.updateEnemyTableOnPosition(greatestAttackPosition, emptyCard);
    }
  }

  holocaust(field : number) : void{
    var cardToSave : CardsOnTable = this.playerTable[field];
    var emptyCard : CardsOnTable = {'attack': -1, 'cost': -1, 'enterTurn' : -1, 'id' : "vazio", 'life' : -1, 'name' : "vazio", 'rarity' : -1, 'Effects' : ["vazio"], 'EffectsOver' : ["vazio"]};

    var newPlayerTable : Array<CardsOnTable> = [emptyCard, emptyCard, emptyCard, emptyCard, emptyCard];
    var newEnemyTable : Array<CardsOnTable> = [emptyCard, emptyCard, emptyCard, emptyCard, emptyCard];

    newPlayerTable[field] = cardToSave;

    this.playerTable = newPlayerTable;
    for(var x = 0; x < this.playerTable.length; x++){
      this.updatePlayerTableOnPosition(x, this.playerTable[x]);
    }

    this.enemyTable = newEnemyTable;
    for(var x = 0; x < this.enemyTable.length; x++){
      this.updateEnemyTableOnPosition(x, this.enemyTable[x]);
    }    
  }

  hypnosis() : void{
    var emptyCard : CardsOnTable = {'attack': -1, 'cost': -1, 'enterTurn' : -1, 'id' : "vazio", 'life' : -1, 'name' : "vazio", 'rarity' : -1, 'Effects' : ["vazio"], 'EffectsOver' : ["vazio"]};

    var firstTargetPosition = this.getARandomEnemyCardOnTablePosition(); 
    var secondTargetPosition = this.getARandomEnemyCardOnTablePosition();

    if(firstTargetPosition == -1)
      return;

    var firstTargetCard : CardsOnTable = this.enemyTable[firstTargetPosition]; 
    var secondTargetCard : CardsOnTable = this.enemyTable[secondTargetPosition];

    firstTargetCard['life'] -= secondTargetCard['attack'];
    secondTargetCard['life'] -= firstTargetCard['attack'];
    
    if(firstTargetCard['life'] <= 0)
      firstTargetCard = emptyCard;

    if(secondTargetCard['life'] <= 0)
      secondTargetCard = emptyCard;

    this.enemyTable[firstTargetPosition] = firstTargetCard;
    this.enemyTable[secondTargetPosition] = secondTargetCard;

    this.updateEnemyTableOnPosition(firstTargetPosition, firstTargetCard);
    this.updateEnemyTableOnPosition(secondTargetPosition, secondTargetCard);
  }

  invent() : void{
    var cardPosition = this.getARandomPlayerCardOnTablePosition();

    if(cardPosition == -1)
      return;

    var targetCard = this.playerTable[cardPosition];
    targetCard['attack'] *= 2;

    this.playerTable[cardPosition] = targetCard;
    this.updatePlayerTableOnPosition(cardPosition, targetCard);
  }

  pacifism() : void{
    var targetPosition = this.getARandomEnemyCardOnTablePosition(); 

    if(targetPosition == -1)
      return;

    var targetCard : CardsOnTable = this.enemyTable[targetPosition];
    targetCard['attack'] = 1;

    this.enemyTable[targetPosition] = targetCard;
    this.updateEnemyTableOnPosition(targetPosition, targetCard);
  }

  paint(){
    var targetPosition = this.getARandomPlayerCardOnTablePosition(); 

    if(targetPosition == -1)
      return;

    var targetCard : CardsOnTable = this.playerTable[targetPosition];

    targetCard['life'] *= 2;

    this.playerTable[targetPosition] = targetCard;
    this.updatePlayerTableOnPosition(targetPosition, targetCard);
  }

  performance() : void{
    for(var x = 0; x < this.playerTable.length; x++){
      if(this.playerTable[x]['name'] != "vazio"){
        this.playerTable[x]['life'] += 1;
      }
    }

    for(var x = 0; x < this.playerTable.length; x++){
      this.updatePlayerTableOnPosition(x, this.playerTable[x]);
    }
  }

  purge() : void{
    var newEnemyTable : Array<CardsOnTable> = this.enemyTable;
    var emptyCard : CardsOnTable = {'attack': -1, 'cost': -1, 'enterTurn' : -1, 'id' : "vazio", 'life' : -1, 'name' : "vazio", 'rarity' : -1, 'Effects' : ["vazio"], 'EffectsOver' : ["vazio"]};

    for(var x = 0; x < newEnemyTable.length; x++){
      if(newEnemyTable[x]['name'] != "vazio"){
        newEnemyTable[x]['life'] -= 1;
        if(newEnemyTable[x]['life'] <= 0)
          newEnemyTable[x] = emptyCard;
      }
    }

    for(var x = 0; x < newEnemyTable.length; x++){
      this.enemyTable[x] = newEnemyTable[x];
      this.updateEnemyTableOnPosition(x, newEnemyTable[x]);
    }
  }

  setHandCardsImages(){
    var char : string = "";
    var cost : string = "";
    var attack : string = "";
    var life : string = "";
    var name : string = "";

    char = 'assets/images/card/chars/default.png';
    cost = 'assets/images/card/GoldLevel.png';
    attack = 'assets/images/card/Markers.png';
    life = 'assets/images/card/Markers.png';
    name = 'assets/images/card/NameSign.png';

    if(this.cardsOnHand[0]['name'] == "vazio"){
      this.playerHand1CardChar = char;
      this.playerHand1CardCost = cost;
      this.playerHand1CardAttack = attack;
      this.playerHand1CardLife = life;
      this.playerHand1CardName = name;
    }else{
      this.playerHand1CardChar = 'assets/images/card/chars/'+this.cardsOnHand[0]['id']+'.png';
      this.playerHand1CardCost = 'assets/images/card/costs/'+this.cardsOnHand[0]['cost']+'.png';
      this.playerHand1CardAttack = 'assets/images/card/attacks/'+this.cardsOnHand[0]['attack']+'.png';
      this.playerHand1CardLife = 'assets/images/card/lifes/'+this.cardsOnHand[0]['life']+'.png';
      this.playerHand1CardName = 'assets/images/card/names/'+this.cardsOnHand[0]['id']+'.png';
    }

    if(this.cardsOnHand[1]['name'] == "vazio"){
      this.playerHand2CardChar = char;
      this.playerHand2CardCost = cost;
      this.playerHand2CardAttack = attack;
      this.playerHand2CardLife = life;
      this.playerHand2CardName = name;
    }else{
      this.playerHand2CardChar = 'assets/images/card/chars/'+this.cardsOnHand[1]['id']+'.png';
      this.playerHand2CardCost = 'assets/images/card/costs/'+this.cardsOnHand[1]['cost']+'.png';
      this.playerHand2CardAttack = 'assets/images/card/attacks/'+this.cardsOnHand[1]['attack']+'.png';
      this.playerHand2CardLife = 'assets/images/card/lifes/'+this.cardsOnHand[1]['life']+'.png';
      this.playerHand2CardName = 'assets/images/card/names/'+this.cardsOnHand[1]['id']+'.png';
    }

    if(this.cardsOnHand[2]['name'] == "vazio"){
      this.playerHand3CardChar = char;
      this.playerHand3CardCost = cost;
      this.playerHand3CardAttack = attack;
      this.playerHand3CardLife = life;
      this.playerHand3CardName = name;
    }else{
      this.playerHand3CardChar = 'assets/images/card/chars/'+this.cardsOnHand[2]['id']+'.png';
      this.playerHand3CardCost = 'assets/images/card/costs/'+this.cardsOnHand[2]['cost']+'.png';
      this.playerHand3CardAttack = 'assets/images/card/attacks/'+this.cardsOnHand[2]['attack']+'.png';
      this.playerHand3CardLife = 'assets/images/card/lifes/'+this.cardsOnHand[2]['life']+'.png';
      this.playerHand3CardName = 'assets/images/card/names/'+this.cardsOnHand[2]['id']+'.png';
    }

    if(this.cardsOnHand[3]['name'] == "vazio"){
      this.playerHand4CardChar = char;
      this.playerHand4CardCost = cost;
      this.playerHand4CardAttack = attack;
      this.playerHand4CardLife = life;
      this.playerHand4CardName = name;
    }else{
      this.playerHand4CardChar = 'assets/images/card/chars/'+this.cardsOnHand[3]['id']+'.png';
      this.playerHand4CardCost = 'assets/images/card/costs/'+this.cardsOnHand[3]['cost']+'.png';
      this.playerHand4CardAttack = 'assets/images/card/attacks/'+this.cardsOnHand[3]['attack']+'.png';
      this.playerHand4CardLife = 'assets/images/card/lifes/'+this.cardsOnHand[3]['life']+'.png';
      this.playerHand4CardName = 'assets/images/card/names/'+this.cardsOnHand[3]['id']+'.png';
    }

    if(this.cardsOnHand[4]['name'] == "vazio"){
      this.playerHand5CardChar = char;
      this.playerHand5CardCost = cost;
      this.playerHand5CardAttack = attack;
      this.playerHand5CardLife = life;
      this.playerHand5CardName = name;
    }else{
      this.playerHand5CardChar = 'assets/images/card/chars/'+this.cardsOnHand[4]['id']+'.png';
      this.playerHand5CardCost = 'assets/images/card/costs/'+this.cardsOnHand[4]['cost']+'.png';
      this.playerHand5CardAttack = 'assets/images/card/attacks/'+this.cardsOnHand[4]['attack']+'.png';
      this.playerHand5CardLife = 'assets/images/card/lifes/'+this.cardsOnHand[4]['life']+'.png';
      this.playerHand5CardName = 'assets/images/card/names/'+this.cardsOnHand[4]['id']+'.png';
    }
  }

  
  changeTurn(){
    if(this.currentPlayer == "Seu turno"){
      //passa o turno

      //zera as cartas que atacaram
      this.cardsThatAttackedThisTurn = [0, 0, 0, 0, 0];

      if(this.whoIsThisPlayer == "Player1"){
        console.log("next turn of "+this.matchPlayer2);
        console.log(this.turn++);
        this.afs.collection('matches').doc(this.matchId).update({'currentPlayer' : this.matchPlayer2});
      }
      else if(this.whoIsThisPlayer == "Player2"){
        console.log("next turn of "+this.matchPlayer1);
        console.log(this.turn++);
        this.afs.collection('matches').doc(this.matchId).update({'turn' : this.turn++, 'currentPlayer' : this.matchPlayer1});
      }

      //compra uma carta
      for(var x = 0; x < 5; x++){
        if(this.cardsOnHand[x]['id'] == "vazio"){
          this.lastCardGot++;
          this.cardsOnHand[x] = this.matchCards[this.lastCardGot];
          this.setHandCardsImages();
          break;
        }
      }
    }
  }
  
  setEnemyFieldTarget(field : number) : void{
    //field = 5 é a vida do oponente

    var emptyCard : CardsOnTable = {'attack': -1, 'cost': -1, 'enterTurn' : -1, 'id' : "vazio", 'life' : -1, 'name' : "vazio", 'rarity' : -1, 'Effects' : ["vazio"], 'EffectsOver' : ["vazio"]};

    //dar dano nas cartas
    if(this.attackingCard != null){
      //verificar se é o turno que a carta entrou
      if(this.attackingCard['enterTurn'] == this.turn)
        return;

      //verificar se a carta atacou
      if(this.cardsThatAttackedThisTurn[this.attackingCardPosition] == 1)
        return;

      if(field == 5){
        this.damageEnemy();
        return;
      }

      this.targetCardForAttack = this.enemyTable[field];

      if(this.targetCardForAttack['id'] == "vazio" || this.attackingCard['id'] == "vazio")
        return;

      //verificar se a carta não está sob efeito do charm
      var effectsOnCard : Array<string> = this.attackingCard['EffectsOver'];
      var charm : number = -1;
      for(var x = 0; x < effectsOnCard.length; x++){
        if(effectsOnCard[x] == "charmedByEnemyCardOnPosition0"){
          charm = 0;
        }
        else if(effectsOnCard[x] == "charmedByEnemyCardOnPosition1"){
          charm = 1;
        }
        else if(effectsOnCard[x] == "charmedByEnemyCardOnPosition2"){
          charm = 2;
        }
        else if(effectsOnCard[x] == "charmedByEnemyCardOnPosition3"){
          charm = 3;
        }
        else if(effectsOnCard[x] == "charmedByEnemyCardOnPosition4"){
          charm = 4;
        }

        if(charm == field)
          return;

        charm = -1;
      }

      //verifique se tem immortal
      var effectsOfAttackingCard : Array<string> = this.attackingCard['Effects'];
      var attackingCardHasImmortal : boolean = false;

      for(var x = 0; x < effectsOfAttackingCard.length; x++){
        if(effectsOfAttackingCard[x] == "immortal"){
            attackingCardHasImmortal = true;
            break;
        }
      }

      var effectsOfTargetCard : Array<string> = this.targetCardForAttack['Effects'];
      var targetCardForAttackHasImmortal : boolean = false;

      for(var x = 0; x < effectsOfTargetCard.length; x++){
        if(effectsOfTargetCard[x] == "immortal"){
            targetCardForAttackHasImmortal = true;
            break;
        }
      }

      var oldTargetCardForAttackLife = this.targetCardForAttack['life'];
      var oldAttackingCardLife = this.attackingCard['life'];

      this.targetCardForAttack['life'] -= this.attackingCard['attack'];
      this.attackingCard['life'] -= this.targetCardForAttack['attack'];

      if(this.targetCardForAttack['life'] <= 0){
        this.enemyTable[field] = emptyCard;
        this.updateEnemyTableOnPosition(field, emptyCard);
      }
      else{
        if(targetCardForAttackHasImmortal)
          this.targetCardForAttack['life'] = oldTargetCardForAttackLife;

        this.enemyTable[field] = this.targetCardForAttack;
        this.updateEnemyTableOnPosition(field, this.targetCardForAttack);
      }

      if(this.attackingCard['life'] <= 0){
        this.playerTable[this.attackingCardPosition] = emptyCard;
        this.updatePlayerTableOnPosition(this.attackingCardPosition, emptyCard);
      }
      else{
        if(attackingCardHasImmortal)
          this.attackingCard['life'] = oldAttackingCardLife;

        this.cardsThatAttackedThisTurn[this.attackingCardPosition] = 1;
        this.playerTable[this.attackingCardPosition] = this.attackingCard;
        this.updatePlayerTableOnPosition(this.attackingCardPosition, this.attackingCard);
      }

      this.attackingCard = null;
      this.attackingCardPosition = -1;
      this.targetCardForAttack = null;
    }
  }

  updateEnemyTableOnPosition(position : number, cardInfo : CardsOnTable){
    if(this.whoIsThisPlayer == "Player1"){
        switch(position){
          case(0):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [cardInfo, this.enemyTable[1], 
                                                                this.enemyTable[2], this.enemyTable[3], this.enemyTable[4]]});
            break;
          case(1):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [this.enemyTable[0], cardInfo,
                                                                this.enemyTable[2], this.enemyTable[3], this.enemyTable[4]]});
            break;
          case(2):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [this.enemyTable[0], this.enemyTable[1],
                                                               cardInfo , this.enemyTable[3], this.enemyTable[4]]});
            break;
          case(3):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [this.enemyTable[0], this.enemyTable[1], 
                                                                this.enemyTable[2], cardInfo, this.enemyTable[4]]});
            break;
          case(4):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [this.enemyTable[0], this.enemyTable[1], 
                                                                this.enemyTable[2], this.enemyTable[3], cardInfo]});
            break;
          default:
            return;
        } 
      }
      else if(this.whoIsThisPlayer == "Player2"){
        switch(position){
          case(0):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [cardInfo, this.enemyTable[1], 
                                                                this.enemyTable[2], this.enemyTable[3], this.enemyTable[4]]});
            break;
          case(1):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [this.enemyTable[0], cardInfo,
                                                                this.enemyTable[2], this.enemyTable[3], this.enemyTable[4]]});
            break;
          case(2):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [this.enemyTable[0], this.enemyTable[1],
                                                               cardInfo , this.enemyTable[3], this.enemyTable[4]]});
            break;
          case(3):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [this.enemyTable[0], this.enemyTable[1], 
                                                                this.enemyTable[2], cardInfo, this.enemyTable[4]]});
            break;
          case(4):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [this.enemyTable[0], this.enemyTable[1], 
                                                                this.enemyTable[2], this.enemyTable[3], cardInfo]});
            break;
          default:
            return;
        } 
      }
  }

  updatePlayerTableOnPosition(position : number, cardInfo : CardsOnTable){
    if(this.whoIsThisPlayer == "Player1"){
        switch(position){
          case(0):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [cardInfo, this.playerTable[1], 
                                                                this.playerTable[2], this.playerTable[3], this.playerTable[4]]});
            break;
          case(1):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [this.playerTable[0], cardInfo,
                                                                this.playerTable[2], this.playerTable[3], this.playerTable[4]]});
            break;
          case(2):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [this.playerTable[0], this.playerTable[1],
                                                               cardInfo , this.playerTable[3], this.playerTable[4]]});
            break;
          case(3):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [this.playerTable[0], this.playerTable[1], 
                                                                this.playerTable[2], cardInfo, this.playerTable[4]]});
            break;
          case(4):
            this.afs.collection('matches').doc(this.matchId).update({'Player1Table' : [this.playerTable[0], this.playerTable[1], 
                                                                this.playerTable[2], this.playerTable[3], cardInfo]});
            break;
          default:
            return;
        } 
      }
      else if(this.whoIsThisPlayer == "Player2"){
        switch(position){
          case(0):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [cardInfo, this.playerTable[1], 
                                                                this.playerTable[2], this.playerTable[3], this.playerTable[4]]});
            break;
          case(1):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [this.playerTable[0], cardInfo,
                                                                this.playerTable[2], this.playerTable[3], this.playerTable[4]]});
            break;
          case(2):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [this.playerTable[0], this.playerTable[1],
                                                               cardInfo , this.playerTable[3], this.playerTable[4]]});
            break;
          case(3):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [this.playerTable[0], this.playerTable[1], 
                                                                this.playerTable[2], cardInfo, this.playerTable[4]]});
            break;
          case(4):
            this.afs.collection('matches').doc(this.matchId).update({'Player2Table' : [this.playerTable[0], this.playerTable[1], 
                                                                this.playerTable[2], this.playerTable[3], cardInfo]});
            break;
          default:
            return;
        } 
      }
  }

  damageEnemy(){
    if(this.attackingCard['id'] == "vazio")
      return;

    this.cardsThatAttackedThisTurn[this.attackingCardPosition] = 1;

    var enemyNewLife = this.enemyLife - this.attackingCard['attack'];

    if(this.whoIsThisPlayer == "Player1"){
      this.afs.collection('matches').doc(this.matchId).update({'player2Life' : enemyNewLife});
    }
    else if(this.whoIsThisPlayer == "Player2"){
      this.afs.collection('matches').doc(this.matchId).update({'player1Life' : enemyNewLife});
    }

    this.attackingCard = null;
  }

  setPlayerFieldTarget(field : number) : void{
    this.attackingCard = this.playerTable[field];
    this.attackingCardPosition = field;
  }
}
