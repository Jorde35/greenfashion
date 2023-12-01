import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImgUrl } from '../global';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent {

  img_path: string = ImgUrl;
  cookie: boolean = false;
  articulo: any;
  id_articulo: number;

  constructor (private servicio: ServicioService,private cookieService: CookieService, private active: ActivatedRoute, private router: Router) {
    if(this.cookieService.get('token')){
      this.cookie = true;
    }
    this.id_articulo=this.active.snapshot.params['id_articulo']
    this.mostrarArticulo();
  }
  ngOnInit(): void {
  }
  
  mostrarArticulo(): void{
    this.servicio.mostrarArticulo(this.id_articulo).subscribe((data) => {
      this.articulo=data;
    });
  }

  agregarCarrito(id_articulo:number){
    if(this.cookie){
      this.servicio.agregarCarrito(id_articulo).subscribe((data)=>{
        this.router.navigate(['carrito']);
      });
    }else{
      this.router.navigate(['login']);
    }
  }

  crearComentario(){
      
  }

}
