import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingres',
  templateUrl: './ingres.component.html',
  styleUrls: ['./ingres.component.css']
})
export class IngresComponent implements OnInit {

  ingressForm!: FormGroup;

  type: string = 'i';

  constructor(

    private fb: FormBuilder

  ) { }

  ngOnInit(): void {

    this.ingressForm = this.fb.group({
      desc: ['', [Validators.required]],
      monto: ['', [Validators.required]],
    })

  }

  save() {

    if (this.ingressForm.invalid) return;

    console.log(this.ingressForm.value);

  }

}
