import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import { moveIn, fallIn } from '../../router.animations';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

interface Users{
  deck1: string;
  deck2: string;
  deck3: string;
  deck4: string;
  deck5: string;
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
    this.cards$.subscribe(data => {this.cards=data;console.log(this.cards);console.log(this.cards[0]['effects'][0])});

    if(this.userDoc == null)
      this.firstLogin();
  }

  ngOnInit() {
  	this.userDoc = this.afs.doc('users/'+this.authService.currentUserId);
  }

  logout() {
    this.authService.signOut();
  }

  firstLogin() : void{
    this.afs.collection('users').doc(this.authService.currentUserId).set({ 
        'deck1': "vazio",
        'deck2': "vazio",
        'deck3': "vazio",
        'deck4': "vazio",
        'deck5': "vazio"});
  }
}
