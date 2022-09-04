import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { laptop } from '../../features/pc-list/models/laptop.model';

@Injectable({ providedIn: 'root' })
export class LaptopsService {
  Api = environment.pcfyApi;
  token = environment.token;
  constructor(private http: HttpClient) {}

  create(formData: FormData) {
    formData.append('token', this.token);
    // laptop.token = this.token;
    return this.http.post(`${this.Api}/laptop/create`, formData).pipe() as any;
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
