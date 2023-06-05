import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {UserLogin} from "../shared/interfaces/auth-interfaces/userLogin";
import {UserRegistration} from "../shared/interfaces/auth-interfaces/userRegistration";
import { valueMatchValidator } from "../shared/validators/valueMatchValidator";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['../login-page/login-page.component.css'],
})
export class RegistrationPageComponent implements OnInit {
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
    },{
      validators: valueMatchValidator('password', 'passwordRepeat')
    })
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

    this.auth.register(head).subscribe(() => {
      this.auth.login(this.registrationForm.value.email)
        .subscribe(() => this.router.navigate(['/admin', 'list-employees']))
      this.registrationForm.reset()
      this.submitted = false
    })
  }
}
