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


@Component({
  selector: 'defeat',
  templateUrl: './defeat.component.html',
  styleUrls: ['./defeat.component.css']
})
export class DefeatComponent implements OnInit {

  constructor(public authService: AuthService, private afs : AngularFirestore, private router: Router, private data: DataService) {
  	setTimeout(() => this.router.navigate(['/menu']), 5000);
  }

  ngOnInit() {
  }
}
