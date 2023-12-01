import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrar-articulo',
  templateUrl: './registrar-articulo.component.html',
  styleUrls: ['./registrar-articulo.component.css']
})
export class RegistrarArticuloComponent {
  articuloForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = '';
  image: any = null;

  constructor(private fb: FormBuilder,private servicio: ServicioService,private router: Router) {
    this.articuloForm = this.fb.group({
      nombre_articulo: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      tipo_articulo: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      marca: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      precio: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
      cantidad: [1, [Validators.required, Validators.pattern('^[0-9]*$')]],
      descripcion: ['', Validators.required],
      'file': [null, Validators.required],
    });
    this.articuloForm.valueChanges.subscribe((value) => {
    });
  }
  imageValidator(control: AbstractControl): { [key: string]: any } | null {
    if (control.value === null) {
      return { 'imageRequired': true };
    }
    return null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.image = file;
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreview = '';
    }
  }
 
  onSubmit(envio: any) {
    console.log(typeof envio);
    if (this.articuloForm.valid) {
  
      const formData = new FormData();
    
    if (this.imagePreview) {
      formData.append('file', this.image); // El nombre 'file' debe coincidir con el esperado en Laravel.
    }
    formData.append('nombre_articulo', envio.nombre_articulo);
    formData.append('tipo_articulo', envio.tipo_articulo);
    formData.append('descripcion', envio.descripcion);
    formData.append('cantidad', envio.cantidad);
    formData.append('precio', envio.precio);
    formData.append('marca', envio.marca);
    envio.file = this.image;
  
      this.servicio.crearArticulo(formData).subscribe((data) => {
        this.router.navigate(['principal']);
      });
    } else {
      console.log('Formulario no válido, verifique los campos.');
    }
  }
  

}

