import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";
import { UserRegistration } from "../shared/interfaces/auth-interfaces/userRegistration";
import { valueMatchValidator } from "../shared/validators/valueMatchValidator";
import { transition, animate, state, style, trigger } from '@angular/animations';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['../login-page/login-page.component.css'],
  animations: [
    trigger('login-page_title', [
      state('start', style({ color: '#1E293B' })),
      state('end', style({
        color: '#000',
        transform: 'scale(1.2)'
      })),
      transition('start <=> *', animate(450)),
    ])
  ]
})

export class RegistrationPageComponent implements OnInit, OnDestroy {

  boxState = 'start'
  registerSub!: Subscription
  loginSub!: Subscription

  registrationForm!: FormGroup
  submitted = false

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      companyName: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordRepeat: new FormControl(null, [
        Validators.required,
      ])
    }, {
      validators: valueMatchValidator('password', 'passwordRepeat')
    })
  }

  ngOnDestroy(): void {
    this.registerSub.unsubscribe()
    this.loginSub.unsubscribe()
  }

  animate() {
    this.boxState = this.boxState === 'end' ? 'start' : 'end'
  }

  submit() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.submitted = true;

    const head: UserRegistration = {
      companyName: this.registrationForm.value.companyName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      status: "head"
    }

    this.registerSub = this.auth.register(head).subscribe(() => {
      this.loginSub = this.auth.login(this.registrationForm.value.email, this.registrationForm.value.password)
        .subscribe(() => this.router.navigate(['/admin', 'list-employees']))
      this.registrationForm.reset()
      this.submitted = false
    })
  }
}
