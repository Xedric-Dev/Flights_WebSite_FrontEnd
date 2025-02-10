import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor (private router : Router) {}

  public isLoggedIn = sessionStorage.getItem("isLoggedIn");
  public isAdmin = sessionStorage.getItem("isAdmin");
  public userLoggedId = Number(sessionStorage.getItem("userLoggedId"));


  LogOut() : void {
    if (sessionStorage.getItem("isLoggedIn")){
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("isAdmin");
      sessionStorage.removeItem("userLoggedId");
      location.reload();
    }
  }
}
