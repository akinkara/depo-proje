import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Item } from '../models/Item';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';
import { User } from '../core/user';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { switchMap } from 'rxjs/operators';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnInit {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  items2: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;
  itemRef: AngularFirestoreCollection<Item>;
  abc$: Observable<Item[]>;
  cba$: BehaviorSubject<Item[]>;
  
  user: Observable<firebase.User>;
  constructor(public afs: AngularFirestore,
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router) {

    //this.itemRef=this.afs.collection('abc');
    //this.abc$=this.itemRef.valueChanges();


    // çalışan son hali
    this.itemsCollection = this.afs.collection('items', ref => ref.where("coId", "==",'1').orderBy('title', 'asc'));


              this.items = this.itemsCollection.snapshotChanges().pipe(map(
                changes => {
                  return changes.map(a => {
                    const data = a.payload.doc.data() as Item;
                    data.id = a.payload.doc.id;
                    return data;
                  });
                }
              ));


  }


  ngOnInit(): void {

    /*var $that = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        //var myuserRef=this.afs.collection('users', ref => ref.where("uid","==",user.uid));
        var myuserRef = this.afs.doc(`users/${user.uid}`).ref;  //this.auth.ref;
        var getDoc = myuserRef.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              console.log('Document data:', doc.data());

              $that.itemsCollection = $that.afs.collection('items', ref => ref.where("coId", "==", doc.data().coId).orderBy('title', 'asc'));

              console.log(doc.data().coId);

              $that.items = $that.itemsCollection.snapshotChanges().pipe(map(
                changes => {
                  return changes.map(a => {
                    const data = a.payload.doc.data() as Item;
                    data.id = a.payload.doc.id;
                    return data;
                  });
                }
              ));
              this.items2 =$that.items;

            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
        //console.log(myuser);
        // User is signed in.
      } else {
        console.log('user is not signed in');
        // No user is signed in.
      }
    });*/

  }

  getItems() {

    return this.items;
  }
  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
  deleteItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.delete();

  }
  updateItem(item: Item) {
    this.itemDoc = this.afs.doc(`items/${item.id}`);
    this.itemDoc.update(item);
  }




}


