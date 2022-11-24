import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private auth: Auth,

    private firestore: Firestore

    ) {

  }

  initAuthListener() {

    return this.auth.beforeAuthStateChanged(user => {

      if (user) {

        console.log(user?.email);

        console.log(user?.uid);


      }

    })

  }

   createUser(name: string, email: string, password: string): Promise<any> {

    return createUserWithEmailAndPassword(this.auth, email, password).then(resp => {

      const newUswer = new User(resp.user.uid, name, email);

      const userRef = collection(this.firestore, 'user');

      return addDoc(userRef, {...newUswer});

    })

  }

  loginUser(email: string, password: string) {

    return signInWithEmailAndPassword(this.auth, email, password);

  }

  logout() {

    return this.auth.signOut();

  }

  isAuth() {

    const uid = this.auth.currentUser?.uid;

    if (uid) {

      return true;

    } else {

      return false;

    }

  }

}
