import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImgUrl } from '../global';

@Component({
  selector: 'app-subasta',
  templateUrl: './subasta.component.html',
  styleUrls: ['./subasta.component.css']
})
export class SubastaComponent implements OnInit{
  f: boolean=true;
  img_path: string = ImgUrl;
  id_subasta : any;
  cookie: boolean = false;
  showForm: boolean = false;
  monto: number = 0;
  subasta: any;
  articulo: any;
  subastadores: any =[]; 
  formato: string = '';
  termino: boolean = true;
  cartera: number = 0;
  showPopup: boolean = false;
  showPopup2: boolean = false;
  showPopup3: boolean = false;
  dueno: number = 0;
  DS: boolean = true;
  

  constructor (private servicio: ServicioService,private cookieService: CookieService, private active: ActivatedRoute, private router: Router) {
    if(this.cookieService.get('token')){
      this.cookie = true;
    }else{
      this.router.navigate(['login']);
    }
    this.id_subasta=this.active.snapshot.params['id_subasta']
  }

  recibirVariable(valor: number) {
    this.cartera = valor;
  }

  ngOnInit() {
    this.mostrarSubasta();
    setInterval(() => {
      this.formatearHora(this.subasta.fecha_cierre);
    }, 1000);
    setInterval(() => {
      this.mostrarSubasta();
    }, 15000);
    
  }

  mostrarSubasta(){
    this.servicio.mostrarSubasta(this.id_subasta).subscribe((data: any) => {
      if(this.cookie && this.DS){
        this.mostrarDueno(data.articulo.email);
      }
      this.subasta = data;
      this.articulo = this.subasta.articulo;
      this.subastadores = this.subasta.subastadores;
      this.subastadores.sort((a: any, b: any) => b.puja - a.puja);
      if(this.f){
        this.monto = this.subasta.precio_venta + 1;
        this.f=false;
      }
    });
  }

  mostrarDueno(dueno:String){
    this.servicio.mostrarDueno(dueno).subscribe((data: any) => {
      this.dueno = data.dueno;
    });
  }

  cerrarSubasta(){
    this.servicio.cerrarSubasta(this.subasta.id_subasta).subscribe((data: any) => {
      this.subasta= data;
      this.closePopup3();
    });
  }

  formatearHora(fecha:any){
    var fechaActual = new Date().getTime()+(3*3600000);
    var fechaDada = new Date(fecha).getTime();
    var diferencia = Math.floor((fechaDada - fechaActual) / 1000);
    var h = Math.floor(diferencia / 3600); 
    var m = Math.floor((diferencia % 3600)/ 60)
    var s = Math.floor((diferencia % 3600)% 60)
    var horas = h<10? '0'+h.toString():h.toString();
    var minutos = m<10? '0'+m.toString():m.toString();
    var segundos = s<10? '0'+s.toString():s.toString();
    if(diferencia>0){
      this.termino = false;
      this.formato = horas + ':' + minutos + ':' + segundos;
    }else{
      this.termino = true;
      this.formato = '00:00:00';
    }
  }

  mostrarFormulario(){
    this.showForm = !this.showForm;
  }

  ofrecerPuja(){
    const envio : any = {
      'id_subasta': this.id_subasta,
      'puja': this.monto
    }
    this.servicio.agregarSubastador(envio).subscribe((data: any) => {
      this.showForm = false;
      this.mostrarSubasta();
      this.closePopup();
    });
  }

  fecha(fecha: string){
    const fechaInicial = new Date(fecha);
    const fechaActual = new Date();
    const GMT = fechaInicial.getTime() - (fechaInicial.getTimezoneOffset()*60000);
    const diferenciaEnMilisegundos = fechaActual.getTime() - GMT;
    
    const segundos = Math.floor(diferenciaEnMilisegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);

    if (semanas > 0) {
      return `Hace ${semanas} ${semanas === 1 ? 'semana' : 'semanas'}`;
    } else if (dias > 0) {
        return `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
    } else if (horas > 0) {
        return `Hace ${horas} ${horas === 1 ? 'hora' : 'horas'}`;
    } else if (minutos > 0) {
        return `Hace ${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;
    } else {
        return 'Hace unos segundos';
    }
}

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  openPopup2() {
    this.showPopup2 = true;
  }

  closePopup2() {
    this.showPopup2 = false;
  }

  openPopup3() {
    this.showPopup3 = true;
  }

  closePopup3() {
    this.showPopup3 = false;
  }
}


