
import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ImgUrl } from '../global';

@Component({
  selector: 'app-mis-articulos',
  templateUrl: './mis-articulos.component.html',
  styleUrls: ['./mis-articulos.component.css']
})
export class MisArticulosComponent {

  img_path= ImgUrl;
  perfil: any;
  articulos: any = []
  showPopup: boolean = false;
  id_articulo: number| null = null;

  constructor(private servicio: ServicioService,private cookieService: CookieService,private router: Router) {
    if(!this.cookieService.get('token')){
      this.router.navigate(['principal']);
    }
  }
  ngOnInit(): void{
    this.mostrarUsuario();
  }

  openPopup(id : number) {
    this.id_articulo = id;
    this.showPopup = true;
  }

  closePopup() {
    this.id_articulo = null
    this.showPopup = false;
  }

  mostrarUsuario(){
    this.servicio.mostrarPerfil().subscribe((data) => {
      this.perfil= data;
      this.articulos = this.perfil.articulos;
      console.log(this.articulos);
    })
  }

  crearSubasta(id : any){
    this.servicio.crearSubasta(id).subscribe((data) => {
      console.log(data);
      this.router.navigate(['subasta/'+data.id_subasta]);
    })
  }

}
