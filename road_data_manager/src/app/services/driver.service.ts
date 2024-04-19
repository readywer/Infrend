import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DriverDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<DriverDTO[]>('/api/driver');
  };

  getOne(id: number) {
    return this.http.get<DriverDTO>('/api/driver/' + id);
  };

  create(driver: DriverDTO) {
    return this.http.post<DriverDTO>('/api/driver', driver);
  };

  update(driver: DriverDTO) {
    return this.http.put<DriverDTO>('/api/driver', driver);
  };

  delete(id: number) {
    return this.http.delete('/api/driver/' + id);
  };
}
