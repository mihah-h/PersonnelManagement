import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";
import { transition, animate, state, style, trigger } from '@angular/animations';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
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
export class LoginPageComponent implements OnInit, OnDestroy {

  boxState = 'start'
  loginForm!: FormGroup
  submitted = false
  loginSub!: Subscription

  constructor(
    public auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe()
  }

  animate() {
    this.boxState = this.boxState === 'end' ? 'start' : 'end'
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;
    const userEmail: string = this.loginForm.value.email
    const userPassword: string = this.loginForm.value.password

    this.loginSub = this.auth.login(userEmail, userPassword)
      .subscribe(() => this.router.navigate(['/admin', 'list-employees']))
  }
}
