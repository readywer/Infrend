import { Routes } from '@angular/router';
import { DriverListComponent } from './driver-list/driver-list.component';
import { CarListComponent } from './car-list/car-list.component';
import { DriverformComponent } from './driverform/driverform.component';
import { CarformComponent } from './carform/carform.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { TravelformComponent } from './travelform/travelform.component';
import { MonthlyQueryComponent } from './monthly-query/monthly-query.component';

export const routes: Routes = [
    {
        path: 'drivers',
        component: DriverListComponent
    },
    {
        path: 'add-driver',
        component: DriverformComponent
    },
    {
        path: 'edit-driver/:id',
        component: DriverformComponent
    },
    {
        path: 'cars',
        component: CarListComponent
    },
    {
        path: 'add-car',
        component: CarformComponent
    },
    {
        path: 'edit-car/:id',
        component: CarformComponent
    },
    {
        path: 'travels',
        component: TravelListComponent
    },
    {
        path: 'add-travel',
        component: TravelformComponent
    },
    {
        path: 'edit-travel/:id',
        component: TravelformComponent
    },
    {
        path: 'monthly-query',
        component: MonthlyQueryComponent
    }
];
