import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { isLoadingAction, stopLoadingAction } from '../../shared/ui.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;

  loading: boolean = false;

  uiSuscription!: Subscription;

  constructor(

    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router,

    private store: Store<AppState>

  ) { }


  ngOnInit(): void {

    this.loginForm = this.fb.group({
      email: ['luis@test.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
    })

    this.uiSuscription = this.store.select('ui').subscribe(ui => {

      console.log(ui.isLoading);

      this.loading = ui.isLoading;

    })

  }

  ngOnDestroy(): void {

    this.uiSuscription.unsubscribe();

  }

  login() {

    if (this.loginForm.invalid) return;

    this.store.dispatch(isLoadingAction());

    const { email, password } = this.loginForm.value;

    this.authService.loginUser(email, password).then(resp => {

      Swal.fire(
        'Correcto',
        'Loguin Exitoso',
        'success'
      )

      this.store.dispatch(stopLoadingAction());

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
