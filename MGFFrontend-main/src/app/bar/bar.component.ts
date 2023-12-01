import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {

  @Output() Cartera: EventEmitter<number> = new EventEmitter<number>();
  cookie: boolean = false;
  money: number=0;
  constructor (private cookieService: CookieService, private servicio: ServicioService) {
    if(this.cookieService.get('token')){
      this.cookie = true;
    }
  }

  ngOnInit() {
    if(this.cookieService.get('token')){
      this.verCartera();
    }
    this.initMenu();
  }

  verCartera(){
    this.servicio.verCartera().subscribe((data) => {
      this.money= data.cartera;
      this.Cartera.emit(this.money);
    })
  }
  
  CarteraA() {
    this.Cartera.emit(this.money);
  }

  initMenu() {
    (()=>{
      const listElements = document.querySelectorAll('.menu_item--show');
      const list = document.querySelector('.menu_links');
      const menu = document.querySelector('.menu_hamburger');

      const addClick = () => {
        listElements.forEach(element => {
          element.addEventListener('click', () => {
            let subMenu = element.querySelector('.menu_nesting') as HTMLElement; // Realiza un casting a HTMLElement
            let height = 0;
            element.classList.toggle('menu_item--active');
      
            if (subMenu.clientHeight === 0) {
              height = subMenu.scrollHeight;
            }
            subMenu.style.height = `${height}px`;
          });
        });
      }
      
      const deleteStyleHeight = () => {
        listElements.forEach(element => {
          const subMenu = element.querySelector('.menu_nesting') as HTMLElement; // Realiza un casting a HTMLElement
          if (subMenu && subMenu.style) {
            subMenu.removeAttribute('style');
            element.classList.remove('menu_item--active');
          }
        });
      }
      

      window.addEventListener('resize', () => {
        if (window.innerWidth > 800) {
          deleteStyleHeight();
          if(list){
            if (list.classList.contains('menu_links--show')) {
              list.classList.remove('menu_links--show');
            }
          }
          
        } else {
          addClick();
        }
      });

      if (window.innerWidth <= 800) {
        addClick();
      }
      if(menu){
        menu.addEventListener('click', () => {if(list){list.classList.toggle('menu_links--show')}});
      }
    })();
  }
}
