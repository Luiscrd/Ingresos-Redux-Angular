import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { isLoadingAction, stopLoadingAction } from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;

  loading: boolean = false;

  uiSuscription!: Subscription;

  constructor(

    private fb: FormBuilder,

    private authService: AuthService,

    private router: Router,

    private store: Store<AppState>

    ) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['Luis Carballo', Validators.required],
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

  createUserr() {

    if (this.registerForm.invalid) return;

    this.store.dispatch(isLoadingAction());

    const { name, email, password } = this.registerForm.value;

    this.authService.createUser(name, email, password).then(resp =>{

      Swal.fire(
        'Aceptado',
        'Registro Exitoso',
        'success'
      )

      this.store.dispatch(stopLoadingAction());

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
