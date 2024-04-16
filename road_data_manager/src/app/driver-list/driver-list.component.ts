import { Component, OnInit, inject } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { DriverDTO } from '../../../models';

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

  ngOnInit(): void {
      this.driverService.getAll().subscribe({
        next: drivers=> this.drivers= drivers,
        error: err=> console.error(err)
      })
  }
  
  deleteDriver(driverId: number): void {
    this.driverService.delete(driverId).subscribe({
      next: () => {
        // Sikeres törlés esetén frissítsük a sofőrök listáját
        this.drivers = this.drivers.filter(driver => driver.id !== driverId);
      },
      error: err => console.error(err)
    });
  }

}
