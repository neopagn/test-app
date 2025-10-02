import { Component, inject, Injector } from '@angular/core';
import { LoginForm } from './login-form/login-form';
import { AuthService } from '../../services/auth/auth-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone:true,
})
export class Login {
  
}
