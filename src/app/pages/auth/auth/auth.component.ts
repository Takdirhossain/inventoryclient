import { Router, Routes } from '@angular/router';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { min } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginForm!: FormGroup;
  user: any
  constructor(private authservice: AuthService, private route: Router, private toastr: ToastrService) {}
  ngOnInit() {
    this.setup();
  }

  get fc() {
    return this.loginForm.controls;
  }

  setup() {
    const { required, email, pattern, minLength } = Validators;
    this.loginForm = new FormGroup({
      email: new FormControl('', [required, email]),
      password: new FormControl('', [required, minLength(6)]),
    });
  }

  login() {
    const data = this.loginForm.value;
    this.user = this.authservice.login(data);
    if (this.user ) {
      this.toastr.success("Login successful")

      const json = JSON.stringify(this.user);
      localStorage.setItem('user',json)

      this.route.navigate(['auth/dashboard/home']);
    } else {
      this.toastr.warning("login failed")
    }
  }
}
