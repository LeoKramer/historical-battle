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

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

	userDoc: AngularFirestoreDocument<Users>;

  constructor(public authService: AuthService, private afs : AngularFirestore) {
    if(this.userDoc == null)
			this.afs.collection('users').doc(this.authService.currentUserId).set({ 
        'deck1': "vazio",
        'deck2': "vazio",
        'deck3': "vazio",
        'deck4': "vazio",
        'deck5': "vazio"});
  }

  ngOnInit() {
  	this.userDoc = this.afs.doc('users/'+this.authService.currentUserId);
  }

  logout() {
    this.authService.signOut();
  }
}
