import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { inject, Injector } from '@angular/core';
import { first, map } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.loginStatus$.pipe(
    first(), map(isLoggedIn=>{
      if(isLoggedIn) return router.createUrlTree(['/'])
      else {return true};
      
    }
  ))
  
};
