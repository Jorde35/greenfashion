import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.css']
})
export class ContrasenaComponent {
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder,private cookieService: CookieService,private router: Router) {
    if(!this.cookieService.get('token')){
      this.router.navigate(['principal']);
    }
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      // Aquí puedes agregar la lógica para cambiar la contraseña, por ejemplo, haciendo una solicitud al servidor.
      console.log('Contraseña cambiada con éxito');
    } else {
      console.log('Formulario no válido, verifique los campos.');
    }
  }
}
