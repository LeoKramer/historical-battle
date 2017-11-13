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

interface Effects{
  effect : string;
  name : string;
}

@Component({
  selector: 'booster-menu',
  templateUrl: './booster-menu.component.html',
  styleUrls: ['./booster-menu.component.css']
})

export class BoosterMenuComponent implements OnInit{
	userDoc: AngularFirestoreDocument<Users>;
	user$ : Observable<Users>;
  user: Object;

  cardsCollectionRef: AngularFirestoreCollection<Cards>;
  cards$: Observable<Cards[]>;
  cards: Object;

  cardsList : Array<Cards> = [];

  cardsListByRarity : Array<Cards> = [];

  accountCardsList : Array<string> = [];

  earnedCards : Array<Cards> = [];

  playerGold : number = 0;

  dontHaveEnoughGold = true;

  earnedCard1Base : string = 'assets/images/card/Blue.png';
  earnedCard1Cave : string = 'assets/images/card/Cave.png';
  earnedCard1Curtain : string = 'assets/images/card/Red.png';
  earnedCard1Void : string = 'assets/images/card/Void.png';
  earnedCard1Char : string = 'assets/images/card/chars/default.png';
  earnedCard1Cost : string = 'assets/images/card/GoldLevel.png';
  earnedCard1Attack : string = 'assets/images/card/Markers.png';
  earnedCard1Life : string = 'assets/images/card/Markers.png';
  earnedCard1Name : string = 'assets/images/card/NameSign.png';

  earnedCard2Base : string = 'assets/images/card/Blue.png';
  earnedCard2Cave : string = 'assets/images/card/Cave.png';
  earnedCard2Curtain : string = 'assets/images/card/Red.png';
  earnedCard2Void : string = 'assets/images/card/Void.png';
  earnedCard2Char : string = 'assets/images/card/chars/default.png';
  earnedCard2Cost : string = 'assets/images/card/GoldLevel.png';
  earnedCard2Attack : string = 'assets/images/card/Markers.png';
  earnedCard2Life : string = 'assets/images/card/Markers.png';
  earnedCard2Name : string = 'assets/images/card/NameSign.png';

  earnedCard3Base : string = 'assets/images/card/Blue.png';
  earnedCard3Cave : string = 'assets/images/card/Cave.png';
  earnedCard3Curtain : string = 'assets/images/card/Red.png';
  earnedCard3Void : string = 'assets/images/card/Void.png';
  earnedCard3Char : string = 'assets/images/card/chars/default.png';
  earnedCard3Cost : string = 'assets/images/card/GoldLevel.png';
  earnedCard3Attack : string = 'assets/images/card/Markers.png';
  earnedCard3Life : string = 'assets/images/card/Markers.png';
  earnedCard3Name : string = 'assets/images/card/NameSign.png';

  earnedCard1Repeated : string = "";
  earnedCard2Repeated : string = "";
  earnedCard3Repeated : string = "";

  constructor(public authService: AuthService, private afs : AngularFirestore, private router: Router, private data: DataService) {
    this.userDoc = this.afs.doc('users/'+this.authService.currentUserId);
    this.user$ = this.userDoc.valueChanges();
    this.user$.subscribe(data => {

      if(this.playerGold != data['gold'])
        this.playerGold = data['gold'];

      if(this.playerGold >= 100)
        this.dontHaveEnoughGold = false;
      else
        this.dontHaveEnoughGold = true;

      for(var x = 0; x < data['accountCards'].length; x++){
        this.accountCardsList[x] = data['accountCards'][x];
      }
    });

    this.cardsCollectionRef = this.afs.collection<Cards>('cards');
    this.cards$ = this.cardsCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Cards;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    this.cards$.subscribe(data =>{
      for(var x = 0; x < data.length; x++){
        this.cardsList[x] = data[x];
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

  buyBooster(){
    if(this.playerGold < 100)
      return;

    var newAccountCards : Array<string> = this.accountCardsList;

    var rarity : number = 0;
    var offset : number = 0;
    for(var x = 0; x < this.cardsList.length; x++){
      rarity = this.cardsList[x]['rarity'];
      for(var y = rarity; y > 0; y--){
        this.cardsListByRarity[offset] = this.cardsList[x];
        offset++;
      }
    }

    this.earnedCards[0] = this.cardsListByRarity[Math.floor(Math.random() * (this.cardsListByRarity.length-1)) + 0];
    this.earnedCards[1] = this.cardsListByRarity[Math.floor(Math.random() * (this.cardsListByRarity.length-1)) + 0];
    this.earnedCards[2] = this.cardsListByRarity[Math.floor(Math.random() * (this.cardsListByRarity.length-1)) + 0];

    this.earnedCard1Void = 'assets/images/card/effects/'+this.earnedCards[0]['id']+'.png';
    this.earnedCard1Char = 'assets/images/card/chars/'+this.earnedCards[0]['id']+'.png';
    this.earnedCard1Cost = 'assets/images/card/costs/'+this.earnedCards[0]['cost']+'.png';
    this.earnedCard1Attack = 'assets/images/card/attacks/'+this.earnedCards[0]['attack']+'.png';
    this.earnedCard1Life = 'assets/images/card/lifes/'+this.earnedCards[0]['life']+'.png';
    this.earnedCard1Name = 'assets/images/card/names/'+this.earnedCards[0]['id']+'.png';

    this.earnedCard2Void = 'assets/images/card/effects/'+this.earnedCards[1]['id']+'.png';
    this.earnedCard2Char = 'assets/images/card/chars/'+this.earnedCards[1]['id']+'.png';
    this.earnedCard2Cost = 'assets/images/card/costs/'+this.earnedCards[1]['cost']+'.png';
    this.earnedCard2Attack = 'assets/images/card/attacks/'+this.earnedCards[1]['attack']+'.png';
    this.earnedCard2Life = 'assets/images/card/lifes/'+this.earnedCards[1]['life']+'.png';
    this.earnedCard2Name = 'assets/images/card/names/'+this.earnedCards[1]['id']+'.png';

    this.earnedCard3Void = 'assets/images/card/effects/'+this.earnedCards[2]['id']+'.png';
    this.earnedCard3Char = 'assets/images/card/chars/'+this.earnedCards[2]['id']+'.png';
    this.earnedCard3Cost = 'assets/images/card/costs/'+this.earnedCards[2]['cost']+'.png';
    this.earnedCard3Attack = 'assets/images/card/attacks/'+this.earnedCards[2]['attack']+'.png';
    this.earnedCard3Life = 'assets/images/card/lifes/'+this.earnedCards[2]['life']+'.png';
    this.earnedCard3Name = 'assets/images/card/names/'+this.earnedCards[2]['id']+'.png';

    var repeatedCardsGoldEarned = 0;
    var repeatedCardGoldEarned = 0;
    var repeatedCardRarity = 0;

    var repeatedCount = 0;
    for(var x = 0; x < this.accountCardsList.length; x++){
      if(this.accountCardsList[x] == this.earnedCards[0]['id']){
        repeatedCount++;
      }
    }

    if(repeatedCount == 2){
      repeatedCardRarity =  this.earnedCards[0]['rarity'];
      switch(repeatedCardRarity){
        case(1):
          repeatedCardGoldEarned = 50;
          break;
        case(2):
          repeatedCardGoldEarned = 40;
          break;
        case(3):
          repeatedCardGoldEarned = 30;
          break;
        case(4):
          repeatedCardGoldEarned = 20;
          break;
        case(5):
          repeatedCardGoldEarned = 10;
          break;
        default:
          break;
      }

      this.earnedCard1Repeated = "Repetida! +"+repeatedCardGoldEarned+" de ouro!";
      repeatedCardsGoldEarned += repeatedCardGoldEarned;
    }
    else{
      newAccountCards[length] = this.earnedCards[0]['id'];
    }

    repeatedCount = 0;
    for(var x = 0; x < this.accountCardsList.length; x++){
      if(this.accountCardsList[x] == this.earnedCards[1]['id']){
        repeatedCount++;
      }
    }

    if(repeatedCount == 2){
      repeatedCardRarity =  this.earnedCards[1]['rarity'];
      switch(repeatedCardRarity){
        case(1):
          repeatedCardGoldEarned = 50;
          break;
        case(2):
          repeatedCardGoldEarned = 40;
          break;
        case(3):
          repeatedCardGoldEarned = 30;
          break;
        case(4):
          repeatedCardGoldEarned = 20;
          break;
        case(5):
          repeatedCardGoldEarned = 10;
          break;
        default:
          break;
      }
      
      this.earnedCard2Repeated = "Repetida! +"+repeatedCardGoldEarned+" de ouro!";
      repeatedCardsGoldEarned += repeatedCardGoldEarned;
    }
    else{
      newAccountCards[length] = this.earnedCards[1]['id'];
    }

    repeatedCount = 0;
    for(var x = 0; x < this.accountCardsList.length; x++){
      if(this.accountCardsList[x] == this.earnedCards[2]['id']){
        repeatedCount++;
      }
    }

    if(repeatedCount == 2){
      repeatedCardRarity =  this.earnedCards[2]['rarity'];
      switch(repeatedCardRarity){
        case(1):
          repeatedCardGoldEarned = 50;
          break;
        case(2):
          repeatedCardGoldEarned = 40;
          break;
        case(3):
          repeatedCardGoldEarned = 30;
          break;
        case(4):
          repeatedCardGoldEarned = 20;
          break;
        case(5):
          repeatedCardGoldEarned = 10;
          break;
        default:
          break;
      }
      
      this.earnedCard3Repeated = "Repetida! +"+repeatedCardGoldEarned+" de ouro!";
      repeatedCardsGoldEarned += repeatedCardGoldEarned;
    }
    else{
      newAccountCards[length] = this.earnedCards[2]['id'];
    }

    newAccountCards = newAccountCards.sort((a, b) => {
      if(a < b) return -1;
      if(a > b) return 1;
      return 0;
    });

    this.afs.collection('users').doc(this.authService.currentUserId).update({'accountCards' : newAccountCards});
    this.afs.collection('users').doc(this.authService.currentUserId).update({'gold' : (this.playerGold-100)+repeatedCardsGoldEarned});
  }
}
