import { Routes } from '@angular/router';
import { DriverListComponent } from './driver-list/driver-list.component';
import { CarListComponent } from './car-list/car-list.component';
import { DriverformComponent } from './driverform/driverform.component';
import { CarformComponent } from './carform/carform.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { TravelformComponent } from './travelform/travelform.component';
import { MonthlyQueryComponent } from './monthly-query/monthly-query.component';
import { LoginComponent } from './login/login.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'drivers',
        component: DriverListComponent
    },
    {
        path: 'add-driver',
        component: DriverformComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'edit-driver/:id',
        component: DriverformComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'cars',
        component: CarListComponent
    },
    {
        path: 'add-car',
        component: CarformComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'edit-car/:id',
        component: CarformComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'travels',
        component: TravelListComponent
    },
    {
        path: 'add-travel',
        component: TravelformComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'edit-travel/:id',
        component: TravelformComponent,
        canActivate: [ () => inject(AuthService).preventGuestAccess() ]
    },
    {
        path: 'monthly-query',
        component: MonthlyQueryComponent
    }
];
