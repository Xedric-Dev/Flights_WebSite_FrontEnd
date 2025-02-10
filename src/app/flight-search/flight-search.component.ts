import { Component } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../Models/Flight';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { Router } from '@angular/router';
import { User } from '../Models/User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FormsModule, CommonModule, NavBarComponent],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.css'
})
export class FlightSearchComponent implements OnInit {
  flight : Flight = {
    id:0,
    airlineName : '',
    fromLocation : '',
    toLocation : '',
    fromDate : '',
    toDate : '',
    fromTime : '',
    toTime : '',
    passengerNumber : 0,
    price : 0
  }

  private flightToFav : Flight = {
    id:0,
    airlineName : '',
    fromLocation : '',
    toLocation : '',
    fromDate : '',
    toDate : '',
    fromTime : '',
    toTime : '',
    passengerNumber : 0,
    price : 0
  }

  private user : User ={
    id: 0,
    userName: '',
    password: '',
    favoriteFlights : []
  }

  private userLoggedId = sessionStorage.getItem("userLoggedId");
  public errorMessage : string ='';

  public isLoggedIn = sessionStorage.getItem("isLoggedIn");
  public isAdmin = sessionStorage.getItem("isAdmin");

  public isFiltered : boolean = false;

  public flights : Flight[] = []
  public filteredFilghts : Flight[] =[]

  constructor(private flightService : FlightService, private router : Router, private userService : UserService) {}

  ngOnInit(){
    if(this.userLoggedId){
      this.userService.getUsersById(Number(this.userLoggedId)).subscribe({
        next : (us) =>{
          this.user = us;
        }
      })
    }
    this.flightService.getFlights().subscribe((response: Flight[]) =>{
      this.flights = response;
      console.log(response)
    })
  }


  FilterBy() : void{
    
    this.filteredFilghts = this.flights.filter(p=> {
      if (p.fromLocation==this.flight.fromLocation && 
          p.toLocation==this.flight.toLocation &&
          p.fromDate==this.flight.fromDate &&
          p.passengerNumber>this.flight.passengerNumber){

            return true;
      }
      else return false;
    })
    console.log((document.getElementById("dateStandard") as HTMLInputElement).value)
    console.log(this.filteredFilghts)
    this.isFiltered = true;
    
  }

  EditFlight(id : number) : void {
    this.router.navigate(["edit", id])
  }

  RemoveFlight(id : number) : void {
    this.flightService.deleteFlight(id).subscribe({
      next : (response) =>{
        location.reload();
      },
      error : (err) =>{
        console.error(err);
        this.errorMessage = `Error number ${err.status}`;
      }
    })

  }


  SaveFlight(id: number) : void {
    if(!this.isLoggedIn){
      this.router.navigate(["login"]);
    }
    if(this.isFavAlready(id)){
      console.log("Fav already present")
    }
    else{
      console.log(this.user.favoriteFlights);
      this.user.favoriteFlights?.push(id);
      this.userService.updateUser(this.user).subscribe();
    }
  }

  isFavAlready(id :number) : boolean {
    if (this.user.favoriteFlights?.find(f => f == id)){
      return true
    }
    else return false
  }

}

//C:\Users\feder\Desktop\Esercizi_Angular\fligths-creates-and-book\node_modules\bootstrap\dist\css\bootstrap.min.css

//C:\Users\feder\Desktop\Esercizi_Angular\fligths-creates-and-book\node_modules\bootstrap\dist\js\bootstrap.bundle.min.js
