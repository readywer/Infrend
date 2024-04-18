import { Component, OnInit, inject } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { DriverDTO } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.css'
})
export class DriverListComponent implements OnInit{
  driverService = inject(DriverService);
  drivers: DriverDTO[] = [];
  router = inject(Router);

  ngOnInit(): void {
      this.driverService.getAll().subscribe({
        next: drivers=> this.drivers= drivers,
        error: err=> console.error(err)
      })
  }
  goToDriverForm(id: number) {
    this.router.navigate(['/edit-driver', id]);
  }
  
  deleteDriver(driver: DriverDTO) {
    this.driverService.delete(driver.id).subscribe({
      next: () => {
        const index = this.drivers.indexOf(driver);
        if (index > -1) {
          this.drivers.splice(index, 1);
        }
      },
      error: err => console.error(err)
    });
  }
  
}
