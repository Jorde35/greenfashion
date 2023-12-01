import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BackUrl } from './global';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private httpOptions : any;
  private imgOptions : any;
  constructor(private http: HttpClient, private cookieService: CookieService) { 
    const token = this.cookieService.get('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      })
    }
    this.imgOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      })
    }
  
  }
  mostrarUsuarios(): Observable<any> {
    return this.http.get(BackUrl+'mostrarUsuarios',this.httpOptions);
  }
  actualizarUsuario(formData: FormData): Observable<any> {
    return this.http.post(BackUrl+'actualizarUsuario',formData,this.imgOptions);
  }
  verCartera(): Observable<any> {
    return this.http.get(BackUrl+'verCartera',this.httpOptions);
  }
  logout(): Observable<any> {
    return this.http.get(BackUrl+'logout',this.httpOptions);
  }
  login( formData: FormData): Observable<any> {
    return this.http.post(BackUrl+'login',formData,this.httpOptions);
  }
  crearSubasta(id: number): Observable<any> {
    return this.http.get(BackUrl+'crearSubasta/'+id,this.imgOptions);
  }
  agregarSubastador(formData: FormData): Observable<any> {
    return this.http.post(BackUrl+'agregarSubastador',formData,this.imgOptions);
  }
  mostrarSubasta(id_subasta: number): Observable<any> {
    return this.http.get(BackUrl+'mostrarSubasta/'+id_subasta,this.httpOptions);
  }
  mostrarDueno(dueno: String): Observable<any> {
    return this.http.get(BackUrl+'mostrarDueno/'+dueno,this.httpOptions);
  }
  cerrarSubasta(id_subasta: number): Observable<any> {
    return this.http.get(BackUrl+'cerrarSubasta/'+id_subasta,this.httpOptions);
  }
  mostrarCompras(): Observable<any> {
    return this.http.get(BackUrl+'mostrarCompras',this.httpOptions);
  }
  crearArticulo(formData: FormData): Observable<any> {
    return this.http.post(BackUrl+'crearArticulo',formData,this.imgOptions);
  }
  mostrarArticulos(): Observable<any> {
    return this.http.get(BackUrl+'mostrarArticulos',this.httpOptions);
  }
  mostrarSubastas(): Observable<any> {
    return this.http.get(BackUrl+'mostrarSubastas',this.httpOptions);
  }
  mostrarArticulo(id_articulo: number): Observable<any> {
    return this.http.get(BackUrl+'mostrarArticulo/'+id_articulo,this.httpOptions);
  }
  mostrarUsuario(email: string): Observable<any> {
    return this.http.get(BackUrl+'mostrarUsuario/'+email,this.httpOptions);
  }
  mostrarPerfil(): Observable<any> {
    return this.http.get(BackUrl+'mostrarPerfil',this.httpOptions);
  }
  mostrarCarrito(): Observable<any> {
    return this.http.get(BackUrl+'mostrarCarrito',this.httpOptions);
  }
  agregarCarrito(id_articulo: number): Observable<any> {
    return this.http.get(BackUrl+'agregarCarrito/'+id_articulo,this.httpOptions);
  }
  removerCarrito(id_articulo: number): Observable<any> {
    return this.http.get(BackUrl+'removerCarrito/'+id_articulo,this.httpOptions);
  }
  iniciarCompra(formData: FormData): Observable<any> {
    return this.http.post(BackUrl+'iniciarCompra',formData,this.httpOptions);
  }
  iniciarDeposito(formData: FormData): Observable<any> {
    return this.http.post(BackUrl+'iniciarDeposito',formData,this.httpOptions);
  }
}
