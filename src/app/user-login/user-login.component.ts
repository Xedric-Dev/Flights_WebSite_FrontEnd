import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})

export class UserLoginComponent {

  constructor(private userService :UserService, private router:Router) {} 

  public user : User = {
    id: 0,
    userName: '',
    password: '', 
    favoriteFlights : []    
  }

  public isRegistering : boolean = false;

  private userFiltered? : User

  private errorMessage : string ='';

  setRegister() : void {
    this.isRegistering = true;
  }

  UserLogin(){

    if(this.isRegistering == false)
    {
      this.userService.getUsers().subscribe({
      
        next : (response:User[]) =>
          {
            this.userFiltered = response.find(found =>{
              if(found.userName==this.user.userName && found.password == this.user.password){
                return found;
              }else{
                return undefined;
              }
            })
            if (this.userFiltered != undefined){
              sessionStorage.setItem("isLoggedIn","true")
              sessionStorage.setItem("userLoggedId",String(this.userFiltered.id));
              console.log(this.userFiltered);
              console.log(sessionStorage.getItem("isLoggedIn"));
              console.log("Logged In");
                if(this.userFiltered.isAdmin === true){
                sessionStorage.setItem("isAdmin","true");
                console.log(sessionStorage.getItem("isAdmin"));
                console.log("Wow youre an admin!");
                }
              this.router.navigate(["/"], {state : {reload : true}}).then();
              } 
              else {
              console.log("Wrong User or password")
              }
            
            this.userFiltered = {
                id: 0,
                userName: '',
                password: '',
                isAdmin: false     
            };
          },
        
        error : (err) =>{
          console.error(err);
          this.errorMessage = `Error ${err.status}`;
        }
  
      })
    }
    
    else
    {
      if(this.user.password == (document.getElementById("rp") as HTMLInputElement).value){
        this.userService.createUsers(this.user).subscribe({
          next : (response) =>{
            this.router.navigate(["/"]);
          },
          error : (err) => {
            console.error(err);
            this.errorMessage = `Error ${err.status}`;
          }
  
        })
      }
      
    }
   

  }

}
