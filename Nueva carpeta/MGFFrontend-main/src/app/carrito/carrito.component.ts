import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ImgUrl } from '../global';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  img_path = ImgUrl;
  carrito: any;
  contenido: Array<any> = [];
  total:number = 0;
  showPopup: boolean = false;

  constructor(private servicio: ServicioService,private cookieService: CookieService,private router: Router) {
    if(!this.cookieService.get('token')){
      this.router.navigate(['principal']);
    }
  }
  ngOnInit() {
    this.mostrarCarrito();
  }
  mostrarCarrito(){
    this.servicio.mostrarCarrito().subscribe(data => {
      this.carrito=data;
      this.contenido=this.carrito.contenido;
      this.contenido.forEach(contenido => {
        this.total += contenido.precio;
      });
    });
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  removerArticulo(id_articulo:number){
    this.contenido = this.contenido.filter(articulo => articulo.id_articulo !== id_articulo);
    this.total=0;
    this.contenido.forEach(contenido => {
      this.total += contenido.precio;
    });
    this.servicio.removerCarrito(id_articulo).subscribe(data => {
      console.log('it works!');
    });
  }
  iniciarCompra(){
    var envio:any ={
        'id_carrito':this.carrito.id_carrito,
        'total': this.total,

    }
    this.servicio.iniciarCompra(envio).subscribe(data => {
      console.log(data.url);
      window.location.href = data.url;
    });
  }
}

