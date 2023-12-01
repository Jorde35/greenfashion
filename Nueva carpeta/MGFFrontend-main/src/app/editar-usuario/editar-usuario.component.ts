import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit{
    editProfileForm: FormGroup= new FormGroup({});
    perfil:any;
    valid:boolean = false;
    showPopup: boolean = false;
  
    constructor(private servicio: ServicioService,private fb: FormBuilder,private cookieService: CookieService,private router: Router) {
      if(!this.cookieService.get('token')){
        this.router.navigate(['principal']);
      }
      this.editProfileForm = this.fb.group({
        nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        telefono: ['', [Validators.required, Validators.pattern(/^(\+?56)?(\s?)(0?9)(\s?)(\d{4})(\s?)(\d{4})$/)]],
        direccion: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
        ciudad: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        fecha: ['', [Validators.required]]
      });
    }
    ngOnInit(): void {
      this.mostrarUsuario();
    }


    mostrarUsuario(){
      this.servicio.mostrarPerfil().subscribe((data) => {
        this.perfil= data;
        this.editProfileForm.patchValue({
          nombre: this.perfil.nombre,
          apellido: this.perfil.apellido,
          telefono: this.perfil.telefono,
          direccion: this.perfil.direccion,
          ciudad: this.perfil.ciudad,
          fecha: this.perfil.fecha
        });
        console.log(this.perfil);
      })
    }
    go(){
      this.router.navigate(['perfil']);
    }
    validate(){
      if (this.editProfileForm.valid) {
        this.valid=true;
      } else {
        this.valid=false;
      }
    }
    openPopup() {
      this.showPopup = true;
    }
  
    closePopup() {
      this.showPopup = false;
    }

    onSubmit(envio:any) {
      if (this.editProfileForm.valid) {
        this.servicio.actualizarUsuario(envio).subscribe((data)=>{
          this.openPopup();
        });
      } else {
      }
    }
  }
  