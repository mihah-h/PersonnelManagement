import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {UserLogin} from "../shared/interfaces/auth-interfaces/userLogin";
import {AdminRegistration} from "../shared/interfaces/auth-interfaces/adminRegistration";
import { valueMatchValidator } from "../shared/validators/valueMatchValidator";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['../login-page/login-page.component.css']
})
export class RegistrationPageComponent implements OnInit{
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
      return
    }

    const admin: AdminRegistration = {
      companyName: this.registrationForm.value.companyName,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    }

    this.auth.register(admin).subscribe(() => {
      this.submitted = false

      const userLogin: UserLogin = {
        email: admin.email,
        password: admin.password
      }

      this.auth.login(userLogin).subscribe(() =>
        this.router.navigate(['/admin'])
      )

      this.registrationForm.reset()

    }, () => {
      this.submitted = false
    })
  }
}
