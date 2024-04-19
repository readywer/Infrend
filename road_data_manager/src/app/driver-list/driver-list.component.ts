import { Component, OnInit, inject } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { DriverDTO } from '../../../models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-driver-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.css'
})
export class DriverListComponent implements OnInit {
  driverService = inject(DriverService);
  drivers: DriverDTO[] = [];
  router = inject(Router);
  currentDate = new Date().toISOString().slice(0, 10);
  ngOnInit(): void {
    this.driverService.getAll().subscribe({
      next: drivers => this.drivers = drivers,
      error: err => console.error(err)
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
