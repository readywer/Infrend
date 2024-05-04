import { Component, OnInit, inject } from '@angular/core';
import { CarDTO } from '../../../models';
import { CarService } from '../services/car.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  carService = inject(CarService);
  router = inject(Router);
  authService = inject(AuthService);

  cars: CarDTO[] = [];

  ngOnInit(): void {
    this.carService.getAll().subscribe({
      next: cars => this.cars = cars,
      error: err => console.error(err)
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
