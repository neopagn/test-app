import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../types/user';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {
  user = new User(0,'','',0,'','');
  loginForm = new FormGroup({
    email:new FormControl(this.user.email,[
      Validators.required,
      Validators.email
    ]),
    password:new FormControl(this.user.password,[
      Validators.required,
      Validators.minLength(8)
    ]),
  })

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    console.log(this.loginForm.value)
  }
}
