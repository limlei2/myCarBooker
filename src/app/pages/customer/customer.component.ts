import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, resource } from '@angular/core';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-customer',
  imports: [NgIf],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnDestroy{

  masterService = inject(MasterService)

    constructor(){
      this.masterService.searchData.subscribe((result: any) => {

      })
    }

  apiUrl: string = "https://freeapi.miniprojectideas.com/api/CarRentalApp/";

  customerList = resource({
    loader: () => {
      return fetch(`${this.apiUrl}GetCustomers`)
      .then((result) => result.json() as Promise<any>)
    }
  })

  onReload(){
    this.customerList.reload()
  }

  ngOnDestroy() {
    this.masterService.searchData.next("");
  }

}
