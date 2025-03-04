import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  imports: [AsyncPipe],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {

  vehicleFormData = signal({
    carId: 0,
    brand: "",
    model: "",
    year: 0,
    color: "",
    dailyRate: 0,
    carImage: "",
    regNo: ""
  });

  carList$: Observable<any[]> = new Observable<any[]>;

  apiUrl: string = "https://freeapi.miniprojectideas.com/api/CarRentalApp/";

  http = inject(HttpClient)

  constructor(){
    this.carList$ = this.http.get<any[]>(`${this.apiUrl}GetCars`).pipe(
      map((result: any) => {
        return result.data
      })
    );
  }

  updateForm(key: string, event: any){
    this.vehicleFormData.update((data: any) => ({...data, [key]:event.target.value}))
  }

  onSaveCar(){
    this.http.post(`${this.apiUrl}CreateNewCar`, this.vehicleFormData()).subscribe((result: any) => {
      if(result.result){
        alert("Vehicle Created Successfully")
      } else {
        alert(result.message)
      }
    })
  }

}
