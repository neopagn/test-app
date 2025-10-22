import { Component, inject, Injector, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth-service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Menu } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe, FormsModule, Menu, ButtonModule ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
//error with local storage: local storage dont exist in this env? 
export class Header {
  private auth = inject(AuthService);
  isLoggedIn = this.auth.loginStatus$;
  username = this.auth.username$;
  handleLogOut(){
    this.auth.logout();
  }

  items :any;
  ngOnInit() {
    this.items = [
        {
            label: 'Options', 
            items: [
                {
                    label: 'Info',
                    icon: 'pi pi-info',
                    routerLink: ['/userInfo'] ,
                },
                {
                    label: 'Log out',
                    icon: 'pi pi-sign-out',
                    command: () =>{
                      this.handleLogOut();
                    }
                },
                {
                  label: 'Shopping',
                  icon: 'pi pi-cart',
                  routerLink: ['/browse']
                }
            ]
        }
    ];
}
}
