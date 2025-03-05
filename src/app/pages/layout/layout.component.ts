import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  @ViewChild("searchText") searchText: ElementRef | any;

  masterService = inject(MasterService);

  constructor(){
    this.masterService.searchData.subscribe((result: string) => {
      if(result==''){
        this.searchText.nativeElement['value'] = '';
      }
    })
  }

  
  onChange(event: any) {
    this.masterService.searchData.next(event.target.value)
  }
}
