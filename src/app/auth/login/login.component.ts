import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(

    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['luis@test.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    })

  }

  login() {

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.loginUser(email, password).then(resp => {

      console.log(resp);

      Swal.fire(
        'Correcto',
        'Loguin Exitoso',
        'success'
      )

      this.router.navigateByUrl('/')

    }).catch(err => {

      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña no valido'
      })

    })

  }

}
