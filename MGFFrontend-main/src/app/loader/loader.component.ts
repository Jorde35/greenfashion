// loader.component.ts
import { Component } from '@angular/core';
import { LoaderService } from '../loader-service.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}

  get isLoading$() {
    console.log(this.loaderService.isLoading$);
    return this.loaderService.isLoading$;
  }
}
