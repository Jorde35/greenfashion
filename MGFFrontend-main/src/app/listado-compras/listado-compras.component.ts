import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ImgUrl } from '../global';

@Component({
  selector: 'app-listado-compras',
  templateUrl: './listado-compras.component.html',
  styleUrls: ['./listado-compras.component.css']
})
export class ListadoComprasComponent implements OnInit{

  img_path = ImgUrl;
  compras: Array<any> = [];
  compraSeleccionada: any = null;

  constructor(private servicio: ServicioService,private cookieService: CookieService,private router: Router) {
    if(!this.cookieService.get('token')){
      this.router.navigate(['principal']);
    }
  }
  ngOnInit(): void {
    this.servicio.mostrarCompras().subscribe((data)=>{
      this.compras=data;
      this.compras = this.compras.filter(objeto => objeto.articulos !== null && objeto.articulos.length > 0);
      console.log(this.compras);
      this.formatoFecha();
      //console.log(data);
    });
  }

  formatoFecha(){
    this.compras.forEach(compra => {
      compra.fecha_compra = new Date(compra.fecha_compra);
    });
    this.compras.sort((a, b) => b.fecha_compra - a.fecha_compra);
    const formato = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    this.compras.forEach(compra => {
      compra.fecha_compra = compra.fecha_compra.toLocaleString('es-ES', formato);
    });
  }

  showDetails(id:number) {
      this.compraSeleccionada = this.compras.find(compra => compra.id_compra === id);
  }
}
