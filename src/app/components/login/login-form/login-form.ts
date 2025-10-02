import { Component, inject, Injector } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../types/user';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
///////REACTIVE FORM//////////////////
export class LoginForm {
  user = new User(0,'','',0,'','','');
  private injector = inject(Injector);
  
  loginError: string|null = null;
  isLoading: boolean = false;

  private router = inject(Router);

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
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = null;
      const formValue = this.loginForm.value;
      const userCredentials = {
        email: formValue.email!,
        password: formValue.password!
      };
      
      console.log('Form values:', userCredentials);
      this.injector.get(AuthService).login(userCredentials).subscribe({
        next : (user)=>{
          this.isLoading = false;
          this.router.navigate(['/']);
        },
        error: (error) =>{
          this.isLoading = false;
          this.loginError = error.message || 'Login failed.';
          
        }
      });
      
    } else {
      console.log('Form is invalid');
    }
  }
}
