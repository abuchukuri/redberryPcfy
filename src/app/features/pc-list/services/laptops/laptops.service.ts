import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { laptop } from '../../models/laptop.model';

@Injectable()
export class LaptopsService {
  Api = environment.pcfyApi;
  token = 'fc753cb7e5739bb133c2e5134696eb47';
  constructor(private http: HttpClient) {}

  creat(laptop: any) {
    laptop.token = 'fc753cb7e5739bb133c2e5134696eb47';
    return this.http.post(`${this.Api}/laptop/create`, laptop).pipe() as any;
  }

  getLaptopList() {
    return this.http.get(
      `${this.Api}/laptops?token=${this.token}`
    ) as Observable<{ data: laptop[] }>;
  }

  getLaptop(id: number) {
    return this.http.get(
      `${this.Api}/laptop/${id}?token=${this.token}`
    ) as Observable<any>;
  }
}
