import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  perfil: any;
  articulos: any = []
  formData: any = {};
  showPopup: boolean = false;
  money:number=0;

  constructor(private servicio: ServicioService, private cookieService: CookieService,private router: Router) {
    if(!this.cookieService.get('token')){
      this.router.navigate(['login']);
    }
  }
  ngOnInit(): void{
    this.mostrarUsuario();
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  mostrarUsuario(){
    this.servicio.mostrarPerfil().subscribe((data) => {
      this.perfil= data;
      this.articulos = this.perfil.articulos;
    })
    /*,(error) => {
      if (error.status) {
        console.log('Código de estado HTTP:', error.status);
        this.cookieService.delete('token');
        this.router.navigate(['principal']);
      }
    });*/
  }

  logout() {
    this.servicio.logout().subscribe((data) => {
      if(data.mensaje){
        this.cookieService.delete('token');
        this.router.navigate(['principal']);
      }
    },(error) => {
      if (error.status) {
        console.log('Código de estado HTTP:', error.status);
        this.cookieService.delete('token');
        this.router.navigate(['principal']);
      }
    });
  }

}
