import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DriverDTO } from '../../../models';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driverform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './driverform.component.html',
  styleUrl: './driverform.component.css'
})
export class DriverformComponent implements OnInit {
  driverService = inject(DriverService);
  formBuilder = inject(FormBuilder);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  isNewDriver = true;

  driverForm = this.formBuilder.group<DriverDTO>({
    id: 0,
    driversLicenseId: '',
    name: '',
    address: '',
    licenseExpireDate: '',
    dateOfBirth: ''
  });

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      this.isNewDriver = false;
      this.driverService.getOne(id).subscribe({
        next: (driver) => this.driverForm.setValue(driver),
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  saveDriver() {
    const driver = this.driverForm.value as DriverDTO;

    if (this.isNewDriver) {
      this.driverService.create(driver).subscribe({
        next: () => {
          this.router.navigateByUrl('/drivers');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.driverService.update(driver).subscribe({
        next: () => {
          this.router.navigateByUrl('/drivers');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
