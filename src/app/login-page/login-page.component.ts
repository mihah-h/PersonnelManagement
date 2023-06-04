import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {UserLogin} from "../shared/interfaces/auth-interfaces/userLogin";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  loginForm!: FormGroup
  submitted = false

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

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

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = true;

    const user: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log(user);

    // this.router.navigate(['/admin', 'list-employees']);
    this.auth.login(user).subscribe(() => {
      this.loginForm.reset();
      this.submitted = false;
      this.router.navigate(['/admin', 'list-employees']);
    },
    (err: Response) => {
      console.log(err);
      this.submitted = false;
    })
  }
}
