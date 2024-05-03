import { Component, OnInit, inject } from '@angular/core';
import { TravelService } from '../services/travel.service';
import { TravelDTO } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [],
  templateUrl: './travel-list.component.html',
  styleUrl: './travel-list.component.css'
})
export class TravelListComponent implements OnInit {
  travelService = inject(TravelService);
  travels: TravelDTO[] = [];
  router = inject(Router);

  ngOnInit(): void {
    this.travelService.getAll().subscribe({
      next: travels => this.travels = travels,
      error: err => console.error(err)
    });
  }
  goToTravelForm(id: number) {
    this.router.navigate(['/edit-travel', id]);
  }

  deleteTravel(travel: TravelDTO) {
    this.travelService.delete(travel.id).subscribe({
      next: () => {
        const index = this.travels.indexOf(travel);
        if (index > -1) {
          this.travels.splice(index, 1);
        }
      },
      error: err => console.error(err)
    });
  }

}
