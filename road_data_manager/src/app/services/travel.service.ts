import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TravelDTO } from '../../../models';

@Injectable({
    providedIn: 'root'
})
export class TravelService {

    http = inject(HttpClient);

    getAll() {
        return this.http.get<TravelDTO[]>('/api/travel');
    };

    getOne(id: number) {
        return this.http.get<TravelDTO>('/api/travel/' + id);
    };

    create(travel: TravelDTO) {
        return this.http.post<TravelDTO>('/api/travel', travel);
    };

    update(travel: TravelDTO) {
        return this.http.put<TravelDTO>('/api/travel', travel);
    };

    delete(id: number) {
        return this.http.delete('/api/travel/' + id);
    };
}
