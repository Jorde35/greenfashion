import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { ImgUrl } from '../global';
import { Router } from '@angular/router';
import { LoaderService } from '../loader-service.service';

@Component({
  selector: 'app-subastas',
  templateUrl: './subastas.component.html',
  styleUrls: ['./subastas.component.css']
})
export class SubastasComponent {
  cookie: boolean = false;
  articulos: any =[];
  subastas: any = [];
  img_path: string = ImgUrl;

  constructor (private servicio: ServicioService,private cookieService: CookieService,private router: Router, private loaderService: LoaderService) {
    if(this.cookieService.get('token')){
      this.cookie = true;
    }
  }
  ngOnInit(): void {
    this.mostrarSubastas();
  }
  mostrarSubastas(): void{
    this.loaderService.show()
    this.servicio.mostrarSubastas().subscribe((data) => {
      this.subastas=data;
      this.loaderService.hide()
    });
  }
  agregarCarrito(id_articulo:number){
    if(this.cookie){
      this.loaderService.show()
      this.servicio.agregarCarrito(id_articulo).subscribe((data)=>{
        this.loaderService.hide();
        this.router.navigate(['carrito']);
      });
    }else{
      this.router.navigate(['login']);
    }
  }
}
