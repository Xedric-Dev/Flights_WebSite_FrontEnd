import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../Models/User';
import { UserService } from '../user.service';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Flight } from '../Models/Flight';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [CommonModule, NavBarComponent],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent {


  constructor (private router : Router, private userService : UserService, private flightService : FlightService) {}

  private userLoggedId = Number(sessionStorage.getItem("userLoggedId"));

  public errorMessage : string = '';

  private flights : Flight[] = [];
  public favFilghts : Flight[] = [];

  public user : User = {
    id: 0,
    userName: '',
    password: '',
    favoriteFlights : []
  }

  ngOnInit(){
    if (!this.userLoggedId){
      this.router.navigate(["/"]);
    }

    this.userService.getUsersById(this.userLoggedId).subscribe({
      next : (us) =>{
        this.user = us;
        this.flightService.getFlights().subscribe({
          next : (f) =>{
            this.flights = f;
            this.user.favoriteFlights?.forEach(id => {
              this.favFilghts.push(this.flights.find(f => f.id == id)!)
            });
          },
          error : (err) =>{
            this.errorMessage = `Error Code n° ${err.status}`;
          }
        });
      },
      error : (err) =>{
        this.errorMessage = `Error Code n° ${err.status}`;
      }
    })
    

  }

  ChangePassword() {
    if ((document.getElementById("cp") as HTMLInputElement).value === this.user.password){
      if((document.getElementById("np") as HTMLInputElement).value === (document.getElementById("rnp") as HTMLInputElement).value){
        this.user.password = (document.getElementById("np") as HTMLInputElement).value;
        if (this.user.password){
          this.userService.updateUser(this.user).subscribe({
            next : (response) =>{
              console.log("Pass Updated")
            },
            error : (err)=>{
              this.errorMessage = `Error Code n° ${err.status}`;
            }
    
          })
        }
        if (document.getElementById("changePassForm")){
          document.getElementById("changePassForm")!.style.display='none';
          }
        if (document.getElementById("changePassButton")){
          document.getElementById("changePassButton")!.style.display='none';
          }
        if (document.getElementById("showFormButton")){
          document.getElementById("showFormButton")!.style.display='block';
          }
      }
      else console.log("Insert Same Pass");
    }
    else console.log("Insert Correct Pass");
  }


  ShowForm() {
    if (document.getElementById("changePassForm")){
      document.getElementById("changePassForm")!.style.display='block';
    }
    if (document.getElementById("changePassButton")){
       document.getElementById("changePassButton")!.style.display='block';
    }
    if (document.getElementById("showFormButton")){
      document.getElementById("showFormButton")!.style.display='none';
    }
  }

  ShowFavFlights() {
    if (document.getElementById("savedFlightElement")){
      document.getElementById("savedFlightElement")!.style.display='block';
    }
    if (document.getElementById("hideFavFlightsButton")){
      document.getElementById("hideFavFlightsButton")!.style.display='block';
    }
    if (document.getElementById("showFavFlightsButton")){
      document.getElementById("showFavFlightsButton")!.style.display='none';
    }
  }

  HideFavFlights() {
    if (document.getElementById("savedFlightElement")){
      document.getElementById("savedFlightElement")!.style.display='none';
    }
    if (document.getElementById("hideFavFlightsButton")){
      document.getElementById("hideFavFlightsButton")!.style.display='none';
    }
    if (document.getElementById("showFavFlightsButton")){
      document.getElementById("showFavFlightsButton")!.style.display='block';
    }
  }


  RemoveFlight(id : number) {
    if (this.user.favoriteFlights?.find(idnum => idnum == id)){
      const index = this.user.favoriteFlights.indexOf(id);
      if (index > -1){
       this.user.favoriteFlights.splice(index, 1);
       location.reload();
      }
      this.userService.updateUser(this.user).subscribe();
     } 
  }

  ShowFavTable() : void {
    if (document.getElementById("favTable")){
      document.getElementById("favTable")!.style.display='block';
    }
    
    
  }


}
