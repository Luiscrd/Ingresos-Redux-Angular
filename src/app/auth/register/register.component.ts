import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(

    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router

    ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['Luis Carballo', Validators.required],
      email: ['luis@test.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    })
  }

  createUserr() {

    if (this.registerForm.invalid) return;

    const { name, email, password } = this.registerForm.value;

    this.authService.createUser(name, email, password).then(resp =>{

      Swal.fire(
        'Aceptado',
        'Registro Exitoso',
        'success'
      )

      this.router.navigateByUrl('/');

    }).catch(err => {

      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El email ya existe',
      })

    })

  }

}
