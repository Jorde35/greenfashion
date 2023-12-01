import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil/perfil.component';
import { ArticuloComponent } from './articulo/articulo.component';
import { CarritoComponent } from './carrito/carrito.component';
import { SubastaComponent } from './subasta/subasta.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ListadoUsuarioComponent } from './listado-usuario/listado-usuario.component';
import { RegistrarArticuloComponent } from './registrar-articulo/registrar-articulo.component';
import { LoaderInterceptor } from './loader-interceptor.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader-service.service';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { BarComponent } from './bar/bar.component';
import { ScriptService } from './script-service.service';
import { ShopBarComponent } from './shop-bar/shop-bar.component';
import { MisArticulosComponent } from './mis-articulos/mis-articulos.component';
import { ContrasenaComponent } from './contrasena/contrasena.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ListadoComprasComponent } from './listado-compras/listado-compras.component';
import { DepositarComponent } from './depositar/depositar.component';
import { SubastasComponent } from './subastas/subastas.component';

registerLocaleData(localeEs);


const config: SocketIoConfig = {
  url: 'http://localhost/MyGreenFashion/Backend/public/subasta',
  options: {}
};


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    ArticuloComponent,
    CarritoComponent,
    SubastaComponent,
    ListadoUsuarioComponent,
    RegistrarArticuloComponent,
    LoaderComponent,
    BarComponent,
    ShopBarComponent,
    MisArticulosComponent,
    ContrasenaComponent,
    EditarUsuarioComponent,
    ListadoComprasComponent,
    DepositarComponent,
    SubastasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    LoaderService,
    ScriptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID, useValue: 'es-ES' 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
