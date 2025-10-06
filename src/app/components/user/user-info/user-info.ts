import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { User } from '../../../types/user';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CurrencyPipe } from '../../../pipes/currency-pipe';
import { CapitalizePipe } from '../../../pipes/capitalize-pipe';

@Component({
  selector: 'app-user-info',
  imports: [AsyncPipe, CurrencyPipe, CapitalizePipe],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {
  private auth = inject(AuthService);
  userInfo$ = this.auth.CurrentUser$.pipe(map((user) => (user ? user : null)));
  value = 240000240000000;
}
