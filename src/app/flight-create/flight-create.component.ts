import { CommonModule} from '@angular/common';
import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../Models/Flight';
import { FlightService } from '../flight.service';
import { Router } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flight-create',
  standalone: true,
  imports: [FormsModule, CommonModule, NavBarComponent],
  templateUrl: './flight-create.component.html',
  styleUrl: './flight-create.component.css'
})
export class FlightCreateComponent {

  constructor(private flightService : FlightService, private router : Router, private route :ActivatedRoute) {}

  private errorMessage = '';

  private isAdminIn = sessionStorage.getItem("isAdmin");

  public flight : Flight = {
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

  public isEditing : boolean = false;

  ngOnInit(){
    if (this.isAdminIn!="true"){
      this.router.navigate(['/']);
    }
    this.route.paramMap.subscribe((result)=>{
      const id = result.get("id");
      if(id){
        this.isEditing = true;
        this.flightService.getFlightsById(Number(id)).subscribe({
          next: (response)=>{
            this.flight = response;
          },
          error: (err)=>{
            console.error(`Error loading Employee: ${err.status}`, err)
            this.errorMessage=`Error loading Employee: ${err.status}`;
          }
        });
      }
    });
  }


  CreateFlight() : void {
    if (!this.isEditing){
      this.flightService.createFlight(this.flight).subscribe({
        next : (response) => {
          this.router.navigate(['/']);
        },
        error : (err) =>{
          console.error(err);
          this.errorMessage = `Error ${err.status}`;
        }
      })
    }
    else{
      this.flightService.updateFlight(this.flight).subscribe({
        next : (response)=>{
          this.router.navigate(['/']);
        },
        error: (err)=>{
          console.error(err);
          this.errorMessage=`Error during update: ${err.status} - ${err.message}`;
        }
      })  
    }
  }
}

