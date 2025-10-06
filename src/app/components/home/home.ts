import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private auth = inject(AuthService);
  isLoggedin = this.auth.loginStatus$;
  username = this.auth.CurrentUser$.pipe(map(user=>user ? user.firstName : null));
  
}
