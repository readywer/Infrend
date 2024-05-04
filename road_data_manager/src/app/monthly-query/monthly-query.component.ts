import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CarDTO, TravelDTO, TravelType } from '../../../models';
import { CarService } from '../services/car.service';
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
    const carId = this.queryForm.value.car;
    const selectedDate = this.queryForm.value.date;

    console.log(carId)
    console.log(selectedDate)
    const foundCar = this.cars.find(car => car.id === carId);
    if (foundCar) {
      this.selectedCar = foundCar;
    } else {
      return;
    }

    var travels = this.travels.filter(travel => {
      return travel.car?.id === this.selectedCar.id;
    });
    
    const [selectedYear, selectedMonth] = selectedDate!.split('-');
    travels = travels.filter(travel => {
      const [travelYear, travelMonth] = travel.date.split('-');
      return travelYear === selectedYear && travelMonth === selectedMonth;
    });

    if (travels.length == 0) {
      this.travelWork = [];
      this.travelPrivate = [];
      this.selectedfuelConsuption = 0;
      this.privateTravel = 0;
      this.privateFuel = 0;
      this.privatePrice = 0;
      this.privateFullPrice = 0;
      this.workTravel = 0;
      this.workFuel = 0;
      this.workPrice = 0;
      this.workFullPrice = 0;
      this.maxNewMilage = 0;
      this.minNewMilage = 0;
      return;
    }

    const maxNewMilageTravel = travels.reduce((maxTravel, currentTravel) => {
      return currentTravel.newMilage > maxTravel.newMilage ? currentTravel : maxTravel;
    }, travels[0]);
    this.maxNewMilage = maxNewMilageTravel ? maxNewMilageTravel.newMilage : 0;

    const minNewMilageTravel = travels.reduce((minTravel, currentTravel) => {
      return currentTravel.newMilage < minTravel.newMilage ? currentTravel : minTravel;
    }, travels[0]);
    this.minNewMilage = minNewMilageTravel.newMilage - minNewMilageTravel.traveledDistance;

    this.travelWork = travels.filter(travel => {
      return travel.type === TravelType.Work;
    });

    this.travelPrivate = travels.filter(travel => {
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
