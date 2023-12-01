import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent {
    formulario : FormGroup;
    showPopup: boolean = false;
    perfil: any;
    inicio : number=0;
  
    constructor(private servicio: ServicioService, private fb: FormBuilder,private cookieService: CookieService,private router: Router) {
      if(!this.cookieService.get('token')){
        this.router.navigate(['principal']);
      }
      this.formulario = this.fb.group({
        total: [this.inicio, [Validators.required,Validators.min(1)]],
      });
      this.mostrarUsuario();
    }
    
    mostrarUsuario(){
      this.servicio.mostrarPerfil().subscribe((data) => {
        this.perfil= data;
      })
    }

    openPopup() {
      this.showPopup = true;
    }
  
    closePopup() {
      this.showPopup = false;
    }

    envio() {
        var envio:any ={
            'total': this.formulario.value.total,
        }
        this.servicio.iniciarDeposito(envio).subscribe(data => {
          window.location.href = data.url;
        });
      }
    }