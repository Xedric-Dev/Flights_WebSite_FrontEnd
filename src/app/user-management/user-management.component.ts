import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User} from '../Models/User';
import { UserService } from '../user.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

constructor (private userService : UserService, private router : Router) {}

private isAdminIn = sessionStorage.getItem("isAdmin");

public userLoggedId = Number(sessionStorage.getItem("userLoggedId"));

public usersList : User[] = [];

private errorMessage : string = "";

ngOnInit(){
  if (this.isAdminIn!="true"){
    this.router.navigate(['/']);
  }
  this.userService.getUsers().subscribe({
    next : (response) =>{
      this.usersList = response ;
    },
    error : (err) =>{
      this.errorMessage = `Error n° ${err.status}`
    }

  })
}

MakeAdmin(id : number) : void {
  this.userService.getUsersById(id).subscribe({
    next : (us) =>{
      if(us.isAdmin != true){
        us.isAdmin = true;
        this.userService.updateUser(us).subscribe({
          next : (response) =>{
            location.reload();
          },
          error : (err) =>{
            this.errorMessage = `Error n° ${err.status}`
          }
        })
      }
      else {
        us.isAdmin = false;
        this.userService.updateUser(us).subscribe({
          next : (response) =>{
            location.reload();
          },
          error : (err) =>{
            this.errorMessage = `Error n° ${err.status}`
          }
        })
      }
    },
    error : (err) =>{
      this.errorMessage = `Error n° ${err.status}`
    }
  })
}

DeleteUser(id : number) : void {
  this.userService.deleteUser(id).subscribe({
    next : (us) =>{
      location.reload();
    },
    error : (err) =>{
      this.errorMessage = `Error n° ${err.status}`
    }
  })
}

}
