import { TestBed } from '@angular/core/testing';

import { ListadoUsuarioService } from './listado-usuario.service';

describe('ListadoUsuarioService', () => {
  let service: ListadoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
