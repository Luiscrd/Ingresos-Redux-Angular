import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private auth: Auth ) {

  }

  createUser(name: string, email: string, password: string) {

    console.log({name, email, password});

    return createUserWithEmailAndPassword(this.auth,email,password);

  }

  loginUser(email: string, password: string) {

    console.log({email, password});

    return signInWithEmailAndPassword(this.auth,email,password);


  }
}
