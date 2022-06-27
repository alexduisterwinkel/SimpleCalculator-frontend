import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Calculation } from './calculation';

describe('ApiService', () => {
  let injector: TestBed;
  let service: ApiService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule,
        ],
        providers: [
          ApiService,
        ],
      }).compileComponents();
      injector = getTestBed();
      service = injector.get(ApiService);
      httpClient = injector.get(HttpClient)
      httpMock = injector.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be GET', () => {
    service.getHistory().subscribe();
    const req = httpMock.expectOne('http://localhost:8080/getHistory');
    expect(req.request.method).toEqual('GET');
  });

  it('should be POST', () => {
    service.calculate(new Calculation()).subscribe();
    const req = httpMock.expectOne('http://localhost:8080/calculate');
    expect(req.request.method).toEqual('POST');
  });

  //optional testing: does the post come with the expected output

  afterEach(() => {
    httpMock.verify();
  });


});
