import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TravelService } from '../services/travel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverDTO, TravelDTO, TravelType } from '../../../models';
import { CarDTO } from '../../../models';
import { CarService } from '../services/car.service';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-travelform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './travelform.component.html',
  styleUrl: './travelform.component.css'
})
export class TravelformComponent implements OnInit {
  travelService = inject(TravelService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  carService = inject(CarService);
  driverService = inject(DriverService);
  cars: CarDTO[] = [];
  drivers: DriverDTO[] = [];
  types: TravelType[] = [TravelType.Work, TravelType.Private];
  isNewTravel = true;
  today = new Date();
  travelForm = this.formBuilder.group<TravelDTO>({
    id: 0,
    driver: null,
    car: null,
    date: "",
    type: TravelType.Work,
    startPlace: "",
    endPlace: "",
    traveledDistance: 0,
    newMilage: 0
  });


  ngOnInit(): void {
    this.carService.getAll().subscribe(cars => this.cars = cars);
    this.driverService.getAll().subscribe(drivers => {
      this.drivers = drivers;

      for (let i = 0; i < this.drivers.length; i++) {
        const driver = this.drivers[i];
        const expireDate = new Date(driver.licenseExpireDate);
        if (expireDate < this.today) {
          this.drivers.splice(i, 1);
          i--;
        }
      }
    });

    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewTravel = false;
      this.travelService.getOne(id).subscribe({
        next: (travel) => this.travelForm.setValue(travel),
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  saveTravel() {
    const travel = this.travelForm.value as TravelDTO;

    if (this.isNewTravel) {
      this.travelService.create(travel).subscribe({
        next: () => {
          this.router.navigateByUrl('/travels');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.travelService.update(travel).subscribe({
        next: () => {
          this.router.navigateByUrl('/travels');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  }

  saveTravelWithComeback() {
    const travel = this.travelForm.value as TravelDTO;

    if (this.isNewTravel) {
      this.travelService.create(travel).subscribe({
        next: () => {
          this.router.navigateByUrl('/travels');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.travelService.update(travel).subscribe({
        next: () => {
          this.router.navigateByUrl('/travels');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    travel.newMilage = Number(travel.newMilage) + Number(travel.traveledDistance);
    const temp = travel.endPlace;
    travel.endPlace = travel.startPlace
    travel.startPlace = temp;
    this.travelService.create(travel).subscribe({
      next: () => {
        this.router.navigateByUrl('/travels');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
