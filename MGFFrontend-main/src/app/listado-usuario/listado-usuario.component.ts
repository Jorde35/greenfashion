import { Component } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css']
})
export class ListadoUsuarioComponent {
  products: any[] = [];
  pages: number[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private servicioService: ServicioService) { }

  ngOnInit() {
    this.servicioService.mostrarUsuarios().subscribe(data => {
      console.log(data);
      this.products = data;
      this.updatePagination();
    });
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination() {
    const totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.pages = Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  searchProducts(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const searchText = inputElement.value;
      this.servicioService.mostrarUsuario(searchText).subscribe(data => {
        this.products = data;
        this.currentPage = 1;
        this.updatePagination();
      });
    }
  }
}
