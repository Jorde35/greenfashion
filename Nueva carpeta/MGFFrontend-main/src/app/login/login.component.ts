import { Component, OnInit} from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  datos: any;
  formData: any = {};

  constructor(private servicio: ServicioService,private cookieService: CookieService,private router: Router) {
    if(this.cookieService.get('token')){
      this.router.navigate(['principal']);
    }
  }

  enviarFormulario(){
    console.log(this.formData);
    this.servicio.login(this.formData).subscribe((data) => {
      this.datos = data;
      this.cookieService.set('token', this.datos.token);
      const tokenFromCookie = this.cookieService.get('token');
      console.log('Valor de la cookie:', tokenFromCookie);
      console.log('Valor original:', this.datos.token);
      this.router.navigate(['principal']);
    });
  }

}
