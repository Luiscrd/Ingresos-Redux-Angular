import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {

  }

  initAuthListener() {

    return this.auth.beforeAuthStateChanged(user => {

      if (user) {

        console.log(user?.email);

        console.log(user?.uid);


      }

    })

  }

  createUser(name: string, email: string, password: string) {

    return createUserWithEmailAndPassword(this.auth, email, password);

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
