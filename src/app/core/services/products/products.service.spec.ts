import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ProductsService } from './products.service';

import { environment } from '../../../../environments/environment';

describe('ProductsService', () => {

  let httpClient: HttpClient; // Cliente para ejecutar peticiones
  let httpTestingController: HttpTestingController; // Controlador para hacer las pruebas
  let service: ProductsService; // Servicio que se va a probar

  // Es algo que se va a ejecutar antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // vamos a probar el metodo getAllProducts
  describe('tests for getAllProducts', () => {

    it('should return products', () => {
      // Arrange
      const expectData = [
        {
          id: '1',
          title: 'asas',
          price: 1212,
          description: 'asas',
          image: 'img/img.jpg'
        },
        {
          id: '2',
          title: 'sdfdf',
          price: 1212,
          description: 'asas',
          image: 'img/img.jpg'
        }
      ];
      let dataError, dataResponse;
      // Act
      console.log(service);
      service.getAllProducts()
        .subscribe(response => {
          dataResponse = response;
        }, error => {
          dataError = error;
        });
      const req = httpTestingController.expectOne(`${environment.url_api}/products`);
      req.flush(expectData);
      // Assert
      expect(dataResponse.length).toEqual(2); // Hipotesis - Se espera que la longitud del array sea de 2
      expect(req.request.method).toEqual('GET'); // Hipotesis - Se espera que el metodo de captura sea GET
      expect(dataError).toBeUndefined(); // Hipotesis - Se espera que no se presenten errores
    });

  });
});
