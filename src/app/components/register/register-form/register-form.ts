import { Component, inject, Injector, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../types/user';
import {  RegisterService } from '../../../services/register/register-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  user: User = new User(0, '', '', 0, '', '', '');
  
  isLoading : boolean = false;
  formError :string |null = null;

  private injector = inject(Injector);
  private router = inject(Router);

  onSubmit() {
    this.isLoading = true;
    // console.log(this.user);
    const userCredentials = {
      firstName: this.user.firstName,
      secondName: this.user.secondName,
      age: this.user.age,
      email: this.user.email,
      password: this.user.password,
    };
    console.log('Form values:', userCredentials);
    this.injector.get(RegisterService).signUp(userCredentials).subscribe({
      next:(user)=>{
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error:(error) =>{
        this.isLoading = false;
        this.formError = error.message || 'Register failed';
      }
    });
  }
  newUser() {
    this.user = new User(0, '', '', 0, '', '', '');
  }
}
