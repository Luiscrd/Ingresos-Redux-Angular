import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor( private fb: FormBuilder ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['Luis Carballo', Validators.required],
      email: ['luis@test.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    })
  }

  createUserr() {

    console.log(this.registerForm.value);

  }

}
