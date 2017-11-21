import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import { moveIn, fallIn } from '../../router.animations';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {DialogModule} from 'primeng/primeng';
import { DataService } from "../../menu/data.service";

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

@Component({
  selector: 'victory',
  templateUrl: './victory.component.html',
  styleUrls: ['./victory.component.css']
})
export class VictoryComponent implements OnInit {

  userDoc: AngularFirestoreDocument<Users>;
  user$ : Observable<Users>;

  constructor(public authService: AuthService, private afs : AngularFirestore, private router: Router, private data: DataService){
    //this.userDoc = this.afs.doc('users/'+this.authService.currentUserId);
    //this.user$ = this.userDoc.valueChanges();

    //this.data.currentMessage.subscribe(message => {
      //console.log("match "+ message);
      //console.log(this.authService.currentUserId);

      //this.afs.collection('matches').doc(message).delete();

      //this.user$.subscribe(data => {
        //var newGold = data['gold'] + 15;
        //this.afs.collection('users').doc(this.authService.currentUserId).update({'gold' : newGold});
        setTimeout(() => this.router.navigate(['/menu']), 5000);
      //});
      
    //});
  }

  ngOnInit() {
  }
  
}
