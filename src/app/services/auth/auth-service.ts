import { inject, Injectable } from '@angular/core';
import { User } from '../../types/user';
import { BehaviorSubject, map, Observable, of, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../localStorage/storage-service';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'api/login';
  private localStorageService = inject(StorageService);//localstorage alt for ssr

  private _CurrentUser = new BehaviorSubject<User | null>(null);

  readonly CurrentUser$ = this._CurrentUser.asObservable();

  readonly loginStatus$ = this.CurrentUser$.pipe(map((user) => !!user));

  constructor() {
    //get user tu local storage de check xem co user nao chua. tao ham
    const userString = this.localStorageService.get('currentUser'); //get user tu local
    //risk of having info leaked. //
    // Shouldnt save user on localStorage, should get token, and fetch it from BE somehow.
    const token = this.localStorageService.get(TOKEN_KEY);
    if (userString && token) {
      //neu co user
      this._CurrentUser.next(JSON.parse(userString));
      console.log(this._CurrentUser)
      console.log('Token retreived ');
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    // return this.http.post<any>(this.apiUrl, {email: user.email, password: user.password}).pipe(
    //   tap((response) => {
    //     if (response.token) {
    //       localStorage.setItem('currentUser', JSON.stringify(response.user));
    //       localStorage.setItem('token', response.token);
    //       this._CurrentUser.next(response.user);
    //       console.log(response);
    //     }
    //   })
    // ); //couldnt figure out how this mock back end works, so just randoms
    console.log('Login with:', credentials.email, credentials.password);
     
    const apiResponse =  Math.random() < 0.5 ? 200 : 400;
    switch (apiResponse) {
      case 200: {
        console.log('Login Successful!');
        //fake token
        const mockToken = btoa(credentials.email + '|' + Date.now()); //HAVE TO GET IT FROM BE
        //fake user
        const mockUser = new User(
          1,
          'duong',
          'Nguyen',
          25,
          credentials.email,
          credentials.email,
          credentials.password
        );
        this.addUserToLocal(mockUser, mockToken);
        this._CurrentUser.next(mockUser);
        return of(mockUser);
      }
      case 400: {
        console.log('Login Failed. Wrong username or password.');
        return throwError(() => new Error('Wrong password or email. Please try again.'));
      }
      default:
        return throwError(() => new Error('Login failed.'));
    }
  }

  logout() {
    this.deleteUserFromLocal();
    this._CurrentUser.next(null);
    console.log('Đã đăng xuất.');
  } 

  // them xoa user trong local:
  private addUserToLocal(user: User, token: string) {
    this.localStorageService.set('currentUser', JSON.stringify(user));
    this.localStorageService.set(TOKEN_KEY, token);
  }
  //delete
  private deleteUserFromLocal() {
    this.localStorageService.remove('currentUser');
    this.localStorageService.remove(TOKEN_KEY);
  }
}
