import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CarDTO } from '../../../models';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-monthly-query',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './monthly-query.component.html',
  styleUrl: './monthly-query.component.css'
})
export class MonthlyQueryComponent implements OnInit {
  formBuilder = inject(FormBuilder);
  carService = inject(CarService);
  cars: CarDTO[] = [];
  fuelprice = 480;
  kmprice = 10;
  ngOnInit(): void {
    this.carService.getAll().subscribe(cars => this.cars = cars);
  }


}
