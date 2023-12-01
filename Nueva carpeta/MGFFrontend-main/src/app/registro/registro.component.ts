import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private servicio: ServicioService,private cookieService: CookieService,private router: Router) {
    if(this.cookieService.get('token')){
      this.router.navigate(['principal']);
    }
  }
}
