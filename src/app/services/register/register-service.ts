import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  //take in register form, send it to be via mock, and receive a response and adjust the front-end.

  //take in register form:

  signUp(credentials:{firstName:string, secondName:string, age: number, email:string, password:string})
   :Observable<any> {
    console.log('Signing up:');
    let randNum = Math.random() < 0.5 ? 200 : 400;
    const apiResponse = randNum;
    switch (apiResponse) {
      case 200: {
        console.log('Sign up Successful!');
        //fake user        
        //fix username field to be included.
        const mockUser = new User(1, credentials.firstName, credentials.secondName,credentials.age,credentials.email,credentials.password,'');
        return of(mockUser);
      }
      case 400: {
        console.log('Register Failed. Used email.');
        return throwError(() => new Error('Register failed.'));
      }
      default:
        return throwError(() => new Error('Register failed.'));
    }
  }
  
}
