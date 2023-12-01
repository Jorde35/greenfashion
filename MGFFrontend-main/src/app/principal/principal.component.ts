import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { ImgUrl } from '../global';
import { Router } from '@angular/router';
import { LoaderService } from '../loader-service.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{

  cookie: boolean = false;
  articulos: any =[];
  articulos2: any =[];
  img_path: string = ImgUrl;

  constructor (private servicio: ServicioService,private cookieService: CookieService,private router: Router, private loaderService: LoaderService) {
    if(this.cookieService.get('token')){
      this.cookie = true;
    }
  }
  ngOnInit(): void {
    this.mostrarArticulos();
  }
  mostrarArticulos(): void{
    this.loaderService.show()
    this.servicio.mostrarArticulos().subscribe((data) => {
      data.forEach((articulo: { en_subasta: number; }) => {
        if (articulo.en_subasta == 0){
          this.articulos.push(articulo);
        }
      });
      if(data.length>8){
        this.articulos2 = this.articulos.slice(8);
        this.articulos = this.articulos.slice(0, 8);
      }
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
