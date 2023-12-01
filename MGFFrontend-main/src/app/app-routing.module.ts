import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { SubastaComponent } from './subasta/subasta.component';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { RegistrarArticuloComponent } from './registrar-articulo/registrar-articulo.component';
import { MisArticulosComponent } from './mis-articulos/mis-articulos.component';
import { ContrasenaComponent } from './contrasena/contrasena.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ListadoComprasComponent } from './listado-compras/listado-compras.component';
import { DepositarComponent } from './depositar/depositar.component';
import { SubastasComponent } from './subastas/subastas.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'subastas', component: SubastasComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'depositar', component: DepositarComponent },
  { path: 'contrasena', component: ContrasenaComponent },
  { path: 'listado', component: ListadoUsuarioComponent },
  { path: 'misArticulos', component: MisArticulosComponent },
  { path: 'subasta/:id_subasta', component: SubastaComponent },
  { path: 'editarUsuario', component: EditarUsuarioComponent },
  { path: 'listadoCompra', component: ListadoComprasComponent },
  { path: 'articulo/:id_articulo', component: ArticuloComponent },
  { path: 'subirArticulo', component: RegistrarArticuloComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}