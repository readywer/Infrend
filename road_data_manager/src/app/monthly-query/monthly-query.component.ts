import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CarDTO, TravelDTO, TravelType } from '../../../models';
import { CarService } from '../services/car.service';
import { getLocaleDateFormat } from '@angular/common';
import { TravelService } from '../services/travel.service';


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
  travelService = inject(TravelService);
  cars: CarDTO[] = [];
  selectedCar: CarDTO = {} as CarDTO;
  travels: TravelDTO[] = [];
  travelWork: TravelDTO[] = [];
  travelPrivate: TravelDTO[] = [];
  selectedDate = '2024-05';
  fuelprice = 480;
  kmprice = 10;
  selectedfuelConsuption = 0;
  privateTravel = 0;
  privateFuel = 0;
  privatePrice = 0;
  privateFullPrice = 0;
  workTravel = 0;
  workFuel = 0;
  workPrice = 0;
  workFullPrice = 0;
  maxNewMilage = 0;
  minNewMilage = 0;

  queryForm = this.formBuilder.group({
    date: "",
    car: this.formBuilder.control({})
  });

  ngOnInit(): void {
    this.carService.getAll().subscribe(cars => this.cars = cars);
    this.travelService.getAll().subscribe(travels => this.travels = travels);
  }

  selectquery() {
    //todo: járműválasztás, hónapválasztás
    const card = this.queryForm.get('car');

    const foundCar = this.cars.find(car => car.id === 2);
    if (foundCar) {
      this.selectedCar = foundCar;
    } else {
      return;
    }

    this.travels = this.travels.filter(travel => {
      return travel.car?.id === this.selectedCar.id;
    });

    // Utazások szűrése a kiválasztott év és hónap alapján
    const [selectedYear, selectedMonth] = this.selectedDate.split('-');
    this.travels = this.travels.filter(travel => {
      const [travelYear, travelMonth] = travel.date.split('-');
      return travelYear === selectedYear && travelMonth === selectedMonth;
    });

    const maxNewMilageTravel = this.travels.reduce((maxTravel, currentTravel) => {
      return currentTravel.newMilage > maxTravel.newMilage ? currentTravel : maxTravel;
    }, this.travels[0]);
    this.maxNewMilage = maxNewMilageTravel.newMilage;

    const minNewMilageTravel = this.travels.reduce((minTravel, currentTravel) => {
      return currentTravel.newMilage < minTravel.newMilage ? currentTravel : minTravel;
    }, this.travels[0]);
    this.minNewMilage = minNewMilageTravel.newMilage - minNewMilageTravel.traveledDistance;

    this.travelWork = this.travels.filter(travel => {
      return travel.type === TravelType.Work;
    });

    this.travelPrivate = this.travels.filter(travel => {
      return travel.type === TravelType.Private;
    });

    this.privateTravel = this.travelPrivate.reduce((totalDistance, travel) => {
      return totalDistance + travel.traveledDistance;
    }, 0);

    this.workTravel = this.travelWork.reduce((totalDistance, travel) => {
      return totalDistance + travel.traveledDistance;
    }, 0);
    if (this.selectedCar)
      this.selectedfuelConsuption = this.selectedCar.fuelConsuption;

    this.privatePrice = this.privateTravel * this.kmprice;
    this.workPrice = this.workTravel * this.kmprice;

    this.privateFuel = this.privateTravel / 100 * this.selectedfuelConsuption * this.fuelprice;
    this.workFuel = this.workTravel / 100 * this.selectedfuelConsuption * this.fuelprice;

    this.privateFullPrice = this.privateFuel + this.privatePrice;
    this.workFullPrice = this.workFuel + this.workPrice;
  }
}
