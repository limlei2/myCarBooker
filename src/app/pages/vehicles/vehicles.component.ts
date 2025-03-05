import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-vehicles',
  imports: [AsyncPipe],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnDestroy{

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
  masterService = inject(MasterService);

  constructor(){
    this.masterService.searchData.subscribe((result: any) => {
      
    })
    this.carList$ = this.http.get<any[]>(`${this.apiUrl}GetCars`).pipe(
      map((result: any) => {
        return result.data
      })
    );
  }

  updateCarList(){
    this.carList$ = this.http.get<any[]>(`${this.apiUrl}GetCars`).pipe(
      map((result: any) => {
        return result.data
      })
    );
  }

  ngOnDestroy() {
    this.masterService.searchData.next("");
  }

  updateForm(key: string, event: any){
    this.vehicleFormData.update((data: any) => ({...data, [key]:event.target.value}))
  }

  onSaveCar(){
    this.http.post(`${this.apiUrl}CreateNewCar`, this.vehicleFormData()).subscribe((result: any) => {
      if(result.result){
        alert("Vehicle Created Successfully")
        this.updateCarList();
      } else {
        alert(result.message)
      }
    })
  }

  onDelete(carId: number){
    this.http.delete(`${this.apiUrl}DeleteCarByCarId?carid=${carId}`).subscribe((result: any) => {
      if(result.result){
        alert("Vehicle Deleted Successfully")
        this.updateCarList();
      } else {
        alert(result.message)
      }
    })
  }

}
