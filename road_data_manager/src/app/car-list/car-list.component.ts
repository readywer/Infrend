import { Component, OnInit, inject } from '@angular/core';
import { CarDTO } from '../../../models';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit{
  carService = inject(CarService);
  cars: CarDTO[] = [];
  router = inject(Router);

  ngOnInit(): void {
      this.carService.getAll().subscribe({
        next: cars=> this.cars= cars,
        error: err=> console.error(err)
      })
  }
  goToCarForm(id: number) {
    this.router.navigate(['/edit-car', id]);
  }
  
  deleteCar(car: CarDTO) {
    this.carService.delete(car.id).subscribe({
      next: () => {
        const index = this.cars.indexOf(car);
        if (index > -1) {
          this.cars.splice(index, 1);
        }
      },
      error: err => console.error(err)
    });
  }
}
