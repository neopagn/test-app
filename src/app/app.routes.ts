import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { App } from './app';
import { UserInfo } from './components/user/user-info/user-info';
import { loginGuard } from './guard/login-guard';
import { Browsing } from './components/browsing/browsing';

export const routes: Routes = [
    {
        path:'',
        component: Home
    },
    {
        path: 'login',
        component: Login,
        canActivate:[loginGuard],
        
    },
    {
        path: 'register',
        component: Register,
        canActivate:[loginGuard]
    },
    {
        path: 'userInfo',
        component: UserInfo,
    },
    {
        path: 'browse',
        component: Browsing,
    }

    
];
