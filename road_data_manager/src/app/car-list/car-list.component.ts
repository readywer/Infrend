import { Component, inject } from '@angular/core';
import { CarDTO } from '../../../models';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  carService = inject(CarService);
  cars: CarDTO[] = [];

  ngOnInit(): void {
      this.carService.getAll().subscribe({
        next: cars=> this.cars= cars,
        error: err=> console.error(err)
      })
  }
}
