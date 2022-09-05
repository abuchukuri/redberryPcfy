import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { brand } from '../../features/registration-form/models/brand.model';
import { CPU } from '../../features/registration-form/models/cpu.model';
import { Position } from '../../features/registration-form/models/position.model';
import { Team } from '../../features/registration-form/models/team.model';

@Injectable({ providedIn: 'root' })
export class FormGeneralHelperService {
  Api = environment.pcfyApi;
  constructor(private http: HttpClient) {}

  getTeams() {
    return this.http.get(`${this.Api}/teams`) as Observable<{ data: Team[] }>;
  }

  getPosition() {
    return this.http.get(`${this.Api}/positions`) as Observable<{
      data: Position[];
    }>;
  }

  getCPUs() {
    return this.http.get(`${this.Api}/cpus`) as Observable<{ data: CPU[] }>;
  }

  getBrands() {
    return this.http.get(`${this.Api}/brands`) as Observable<{ data: brand[] }>;
  }
}
