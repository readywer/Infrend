import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TravelService } from '../services/travel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverDTO, TravelDTO, TravelType } from '../../../models';
import { CarDTO } from '../../../models';

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
  emptyCarDTO: CarDTO[] = [];
  emptyDriverDTO: DriverDTO[] = [];

  travelForm = this.formBuilder.group<TravelDTO>({
    id: 0,
    driver: null,
    car: null,
    date: "",
    type: TravelType.Work,
    startPlace: "",
    endPlace: "",
    traveledDistance: "",
    newMilage: ""
  });

  isNewTravel = true;
  ngOnInit(): void {
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

}
