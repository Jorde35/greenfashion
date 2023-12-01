import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader-service.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mostrar el loader antes de la solicitud HTTP
    this.loaderService.show();

    return next.handle(req).pipe(
      // Ocultar el loader después de que la solicitud haya terminado (éxito o error)
      finalize(() => this.loaderService.hide())
    );
  }
}

