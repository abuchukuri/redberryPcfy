import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { brand } from '../../models/brand.model';
import { CPU } from '../../models/cpu.model';
import { Position } from '../../models/position.model';
import { Team } from '../../models/team.model';

@Injectable()
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
