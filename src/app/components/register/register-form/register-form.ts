import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../types/user';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {
  user: User = new User(0, '', '', 0, '', '', );
  submitted= false;
  onSubmit(){
    this.submitted=true;
  }
  newUser(){
    this.user = new User(0, '', '', 0, '', '', );
  }
}
