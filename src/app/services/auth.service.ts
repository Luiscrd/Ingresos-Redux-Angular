import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { addDoc, doc, Firestore, getDocFromServer } from '@angular/fire/firestore';
import { collection, getDoc } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private auth: Auth,

    private firestore: Firestore,

    private store: Store<AppState>

    ) {

  }

  initAuthListener() {

    return this.auth.beforeAuthStateChanged(user => {

      if (user) {

        const refDoc = doc(this.firestore, '/9aADaMFptyTDOvN9w6DCj4svFPa2/PswqDp7PfaiIhUNFpQ8L');

        getDocFromServer(refDoc).then(resp => {

          const { uid, name, email } = resp.data()!;

          this.store.dispatch(setUser({user: { uid, name, email}}));

        })

      } else {

        this.store.dispatch(unSetUser());

      }

    })

  }

   createUser(name: string, email: string, password: string): Promise<any> {

    return createUserWithEmailAndPassword(this.auth, email, password).then(resp => {

      console.log(resp.user.uid);

      const newUswer = new User(resp.user.uid, name, email);

      const userRef = collection(this.firestore, resp.user.uid)

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

      // TODO: cambiar a false
      return true;

    }

  }

}
