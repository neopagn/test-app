import { Component, inject, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { Observable } from 'rxjs';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [RouterLink,MatMenuModule, MatButtonModule, AsyncPipe ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
//error with local storage: local storage dont exist in this env? 
export class Header {
  private auth = inject(AuthService);
  isLoggedIn = this.auth.loginStatus$;
  username :string = 'Dummy!';
  handleLogOut(){
    this.auth.logout();
  }
}
