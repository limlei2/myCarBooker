import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = "";
  password: string = '';

  router = inject(Router);
  
  onLogin(){
    if(this.username == "admin" && this.password == "1234"){
      this.router.navigateByUrl("dashboard")
    } else {
      alert("Wrong Username or Password")
    }
  }
}
