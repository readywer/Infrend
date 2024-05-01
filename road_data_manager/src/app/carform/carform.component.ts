import { Component, OnInit, inject } from '@angular/core';
import { CarService } from '../services/car.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarDTO } from '../../../models';

@Component({
  selector: 'app-carform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './carform.component.html',
  styleUrl: './carform.component.css'
})
export class CarformComponent implements OnInit {
  carService = inject(CarService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  carForm = this.formBuilder.group<CarDTO>({
    id: 0,
    licensePlate: '',
    type: '',
    fuelType: '',
    fuelConsuption: 0,
    startingMileage: 0
  });

  isNewCar = true;
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewCar = false;
      this.carService.getOne(id).subscribe({
        next: (car) => this.carForm.setValue(car),
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  saveCar() {
    const car = this.carForm.value as CarDTO;

    if (this.isNewCar) {
      this.carService.create(car).subscribe({
        next: () => {
          this.router.navigateByUrl('/cars');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.carService.update(car).subscribe({
        next: () => {
          this.router.navigateByUrl('/cars');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  }
}
