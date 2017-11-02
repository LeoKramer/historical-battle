import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
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
  accountCardsIdsListTemp : Array<string> = [];
  accountCardsNamesList : Array<string> = [];
  accountCardsList: Array<Cards> = [];

  deckCardsIdsList : Array<string> = [];
  deckCardsNamesList: Array<string> = [];
  deckCardsList: Array<Cards> = [];

  numberOfDeckCards : string = "0/30";

  disableSaveDeck : boolean = true;

  cardBase : string = 'assets/images/card/Blue.png';
  cardCave : string = 'assets/images/card/Cave.png';
  cardCurtain : string = 'assets/images/card/Red.png';
  cardVoid : string = 'assets/images/card/Void.png';
  cardChar : string = 'assets/images/card/chars/default.png';
  cardCost : string = 'assets/images/card/GoldLevel.png';
  cardMarkers : string = 'assets/images/card/Markers.png';
  cardName : string = 'assets/images/card/NameSign.png';

  constructor(public authService: AuthService, private afs : AngularFirestore, private data: DataService, private router: Router) {
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

        this.updateNumberOfDeckCards();

        //salvar a lista de cartas da conta
        for(var j = 0; j < user['accountCards'].length; j++){
          this.accountCardsIdsListTemp[j] = user['accountCards'][j];
        }
        console.log(this.accountCardsIdsListTemp);

        //tirar da lista de cartas da conta as cartas que já estão no baralho
        for(var x = 0; x < this.deckCardsIdsList.length; x++){
          for(var y = 0; y < this.accountCardsIdsListTemp.length; y++){
            if(this.accountCardsIdsListTemp[y] == this.deckCardsIdsList[x]){
              this.accountCardsIdsListTemp[y] = "null";
              break;
            }
          }
        }

        var offset = 0;
        for(var x = 0; x < this.accountCardsIdsListTemp.length; x++){
          if(this.accountCardsIdsListTemp[x] != "null"){
            this.accountCardsIdsList[offset] = this.accountCardsIdsListTemp[x];
            offset++;
          }
        }

        //salvar a lista de nomes das cartas de acordo com os ID's
        this.cards$.subscribe(cards => {
          var offset = 0;

          for(var k = 0; k < this.deckCardsIdsList.length; k++){
            for(var y = 0; y < cards.length; y++){
              if(cards[y]['id'] == this.deckCardsIdsList[k]){
                offset = y;
                break;
              }
            }
            this.deckCardsNamesList[k] = cards[offset]['name'];
          }

          console.log(this.deckCardsNamesList);

          for(var k = 0; k < this.accountCardsIdsList.length; k++){
            for(var y = 0; y < cards.length; y++){
              if(cards[y]['id'] == this.accountCardsIdsList[k]){
                offset = y;
                break;
              }
            }
            this.accountCardsNamesList[k] = cards[offset]['name'];
          }

          console.log(this.accountCardsNamesList);

          this.deckCardsNamesList = this.deckCardsNamesList.sort((a, b) => {
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
          });

          this.accountCardsNamesList = this.accountCardsNamesList.sort((a, b) => {
            if(a < b) return -1;
            if(a > b) return 1;
            return 0;
          });

          for(var k = 0; k < this.accountCardsIdsList.length; k++){
            for(var y = 0; y < cards.length; y++){
              if(cards[y]['id'] == this.accountCardsIdsList[k]){
                offset = y;
                break;
              }
            }
            this.accountCardsList[k] = cards[offset];
          }

          console.log(this.accountCardsList);

          for(var k = 0; k < this.deckCardsIdsList.length; k++){
            for(var y = 0; y < cards.length; y++){
              if(cards[y]['id'] == this.deckCardsIdsList[k]){
                offset = y;
                break;
              }
            }
            this.deckCardsList[k] = cards[offset];
          }

          console.log(this.deckCardsList);
        });
      });
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.signOut();
  }

  selectAccountCard(name : string) : void{
    //remover carta da lista de todas as cartas
    var temp : Array<string> = [];
    for(var x = 0; x < this.accountCardsNamesList.length; x++){
      if(this.accountCardsNamesList[x] == name){
        this.accountCardsNamesList[x] = "null";
        break;
      }
    }

    var offset = 0;
    for(var x = 0; x < this.accountCardsNamesList.length; x++){
      if(this.accountCardsNamesList[x] != "null"){
        temp[offset] = this.accountCardsNamesList[x];
        offset++;
      } 
    }

    this.accountCardsNamesList = temp;
    
    var cardsTemp : Array<Cards> = [];
    var card : Cards = null;

    for(var x = 0; x < this.accountCardsList.length; x++){
      if(this.accountCardsList[x]['name'] == name){
        card = this.accountCardsList[x];
        this.accountCardsList[x] = null;
        break;
      }
    }

    offset = 0;
    for(var x = 0; x < this.accountCardsList.length; x++){
      if(this.accountCardsList[x] != null){
        cardsTemp[offset] = this.accountCardsList[x];
        offset++;
      }
    }

    this.accountCardsList = cardsTemp;

    for(var x = 0; x < this.accountCardsIdsList.length; x++){
      if(this.accountCardsIdsList[x] == card['id']){
        this.accountCardsIdsList[x] = "null";
        break
      }
    }

    offset = 0;
    temp = [];
    for(var x = 0; x < this.accountCardsIdsList.length; x++){
      if(this.accountCardsIdsList[x] != "null"){
        temp[offset] = this.accountCardsIdsList[x];
        offset++;
      } 
    }

    this.accountCardsIdsList = temp;

    //Adicionar carta na lista de Todas as Cartas
    this.deckCardsList[this.deckCardsList.length] = card;
    this.deckCardsNamesList[this.deckCardsNamesList.length] = card['name'];
    this.deckCardsNamesList = this.deckCardsNamesList.sort((a, b) => {
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });
    this.deckCardsIdsList[this.deckCardsIdsList.length] = card['id'];
    this.deckCardsIdsList = this.deckCardsIdsList.sort((a, b) => {
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });

    this.updateNumberOfDeckCards();
  }

  selectDeckCard(name : string) : void{
    console.log(name);
    //remover carta do baralho
    var temp : Array<string> = [];
    for(var x = 0; x < this.deckCardsNamesList.length; x++){
      if(this.deckCardsNamesList[x] == name){
        this.deckCardsNamesList[x] = "null";
        break;
      }
    }

    var offset = 0;
    for(var x = 0; x < this.deckCardsNamesList.length; x++){
      if(this.deckCardsNamesList[x] != "null"){
        temp[offset] = this.deckCardsNamesList[x];
        offset++;
      } 
    }

    this.deckCardsNamesList = temp;
    
    var cardsTemp : Array<Cards> = [];
    var card : Cards = null;

    for(var x = 0; x < this.deckCardsList.length; x++){
      if(this.deckCardsList[x]['name'] == name){
        card = this.deckCardsList[x];
        this.deckCardsList[x] = null;
        break;
      }
    }

    offset = 0;
    for(var x = 0; x < this.deckCardsList.length; x++){
      if(this.deckCardsList[x] != null){
        cardsTemp[offset] = this.deckCardsList[x];
        offset++;
      }
    }

    this.deckCardsList = cardsTemp;

    for(var x = 0; x < this.deckCardsIdsList.length; x++){
      if(this.deckCardsIdsList[x] == card['id']){
        this.deckCardsIdsList[x] = "null";
        break
      }
    }

    offset = 0;
    temp = [];
    for(var x = 0; x < this.deckCardsIdsList.length; x++){
      if(this.deckCardsIdsList[x] != "null"){
        temp[offset] = this.deckCardsIdsList[x];
        offset++;
      } 
    }

    this.deckCardsIdsList = temp;

    //Adicionar carta na lista de Todas as Cartas
    this.accountCardsList[this.accountCardsList.length] = card;
    this.accountCardsNamesList[this.accountCardsNamesList.length] = card['name'];
    this.accountCardsNamesList = this.accountCardsNamesList.sort((a, b) => {
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });
    this.accountCardsIdsList[this.accountCardsIdsList.length] = card['id'];
    this.accountCardsIdsList = this.accountCardsIdsList.sort((a, b) => {
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });

    this.updateNumberOfDeckCards();
  }

  updateNumberOfDeckCards() : void{
    this.numberOfDeckCards = this.deckCardsIdsList.length + " / 30";
    if(this.deckCardsIdsList.length == 30)
      this.disableSaveDeck = false;
    else
      this.disableSaveDeck = true;
  }

  cancel() : void{
    this.router.navigate(['/decks']);
  }

  saveDeck(){
    if(this.deck == "deck1"){
      this.afs.collection('users').doc(this.authService.currentUserId).update({ 'deck1' : [this.deckCardsIdsList[0], this.deckCardsIdsList[1], this.deckCardsIdsList[2], this.deckCardsIdsList[3], this.deckCardsIdsList[4], this.deckCardsIdsList[5],
                  this.deckCardsIdsList[6], this.deckCardsIdsList[7], this.deckCardsIdsList[8], this.deckCardsIdsList[9], this.deckCardsIdsList[10], this.deckCardsIdsList[11],
                  this.deckCardsIdsList[12], this.deckCardsIdsList[13], this.deckCardsIdsList[14], this.deckCardsIdsList[15], this.deckCardsIdsList[16], this.deckCardsIdsList[17],
                  this.deckCardsIdsList[18], this.deckCardsIdsList[19], this.deckCardsIdsList[20], this.deckCardsIdsList[21], this.deckCardsIdsList[22], this.deckCardsIdsList[23],
                  this.deckCardsIdsList[24], this.deckCardsIdsList[25], this.deckCardsIdsList[26], this.deckCardsIdsList[27], this.deckCardsIdsList[28], this.deckCardsIdsList[29]]});
    }
    else if(this.deck == "deck2"){
      this.afs.collection('users').doc(this.authService.currentUserId).update({ 'deck2' : [this.deckCardsIdsList[0], this.deckCardsIdsList[1], this.deckCardsIdsList[2], this.deckCardsIdsList[3], this.deckCardsIdsList[4], this.deckCardsIdsList[5],
                  this.deckCardsIdsList[6], this.deckCardsIdsList[7], this.deckCardsIdsList[8], this.deckCardsIdsList[9], this.deckCardsIdsList[10], this.deckCardsIdsList[11],
                  this.deckCardsIdsList[12], this.deckCardsIdsList[13], this.deckCardsIdsList[14], this.deckCardsIdsList[15], this.deckCardsIdsList[16], this.deckCardsIdsList[17],
                  this.deckCardsIdsList[18], this.deckCardsIdsList[19], this.deckCardsIdsList[20], this.deckCardsIdsList[21], this.deckCardsIdsList[22], this.deckCardsIdsList[23],
                  this.deckCardsIdsList[24], this.deckCardsIdsList[25], this.deckCardsIdsList[26], this.deckCardsIdsList[27], this.deckCardsIdsList[28], this.deckCardsIdsList[29]]});
    }
    else if(this.deck == "deck3"){
      this.afs.collection('users').doc(this.authService.currentUserId).update({ 'deck3' : [this.deckCardsIdsList[0], this.deckCardsIdsList[1], this.deckCardsIdsList[2], this.deckCardsIdsList[3], this.deckCardsIdsList[4], this.deckCardsIdsList[5],
                  this.deckCardsIdsList[6], this.deckCardsIdsList[7], this.deckCardsIdsList[8], this.deckCardsIdsList[9], this.deckCardsIdsList[10], this.deckCardsIdsList[11],
                  this.deckCardsIdsList[12], this.deckCardsIdsList[13], this.deckCardsIdsList[14], this.deckCardsIdsList[15], this.deckCardsIdsList[16], this.deckCardsIdsList[17],
                  this.deckCardsIdsList[18], this.deckCardsIdsList[19], this.deckCardsIdsList[20], this.deckCardsIdsList[21], this.deckCardsIdsList[22], this.deckCardsIdsList[23],
                  this.deckCardsIdsList[24], this.deckCardsIdsList[25], this.deckCardsIdsList[26], this.deckCardsIdsList[27], this.deckCardsIdsList[28], this.deckCardsIdsList[29]]});
    }
    else if(this.deck == "deck4"){
      this.afs.collection('users').doc(this.authService.currentUserId).update({ 'deck4' : [this.deckCardsIdsList[0], this.deckCardsIdsList[1], this.deckCardsIdsList[2], this.deckCardsIdsList[3], this.deckCardsIdsList[4], this.deckCardsIdsList[5],
                  this.deckCardsIdsList[6], this.deckCardsIdsList[7], this.deckCardsIdsList[8], this.deckCardsIdsList[9], this.deckCardsIdsList[10], this.deckCardsIdsList[11],
                  this.deckCardsIdsList[12], this.deckCardsIdsList[13], this.deckCardsIdsList[14], this.deckCardsIdsList[15], this.deckCardsIdsList[16], this.deckCardsIdsList[17],
                  this.deckCardsIdsList[18], this.deckCardsIdsList[19], this.deckCardsIdsList[20], this.deckCardsIdsList[21], this.deckCardsIdsList[22], this.deckCardsIdsList[23],
                  this.deckCardsIdsList[24], this.deckCardsIdsList[25], this.deckCardsIdsList[26], this.deckCardsIdsList[27], this.deckCardsIdsList[28], this.deckCardsIdsList[29]]});
    }
    else if(this.deck == "deck5"){
      this.afs.collection('users').doc(this.authService.currentUserId).update({ 'deck5' : [this.deckCardsIdsList[0], this.deckCardsIdsList[1], this.deckCardsIdsList[2], this.deckCardsIdsList[3], this.deckCardsIdsList[4], this.deckCardsIdsList[5],
                  this.deckCardsIdsList[6], this.deckCardsIdsList[7], this.deckCardsIdsList[8], this.deckCardsIdsList[9], this.deckCardsIdsList[10], this.deckCardsIdsList[11],
                  this.deckCardsIdsList[12], this.deckCardsIdsList[13], this.deckCardsIdsList[14], this.deckCardsIdsList[15], this.deckCardsIdsList[16], this.deckCardsIdsList[17],
                  this.deckCardsIdsList[18], this.deckCardsIdsList[19], this.deckCardsIdsList[20], this.deckCardsIdsList[21], this.deckCardsIdsList[22], this.deckCardsIdsList[23],
                  this.deckCardsIdsList[24], this.deckCardsIdsList[25], this.deckCardsIdsList[26], this.deckCardsIdsList[27], this.deckCardsIdsList[28], this.deckCardsIdsList[29]]});
    }

    this.router.navigate(['/decks']);
  }

  showCardInfo(name : string) : void{
    var card : Cards = null;

    for(var x = 0; x < this.deckCardsList.length; x++){
      if(this.deckCardsList[x]['name'] == name){
        card = this.deckCardsList[x];
        break;
      }
    }

    this.cardChar = "assets/images/card/chars/" + card['id'] + ".png";
  }
}

