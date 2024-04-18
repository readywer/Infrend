import { Routes } from '@angular/router';
import { DriverListComponent } from './driver-list/driver-list.component';
import { CarListComponent } from './car-list/car-list.component';
import { DriverformComponent } from './driverform/driverform.component';
import { CarformComponent } from './carform/carform.component';

export const routes: Routes = [
    {
        path: 'drivers',
        component: DriverListComponent
    },
    {
        path: 'cars',
        component: CarListComponent
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
        path: 'add-car',
        component: CarformComponent
    },
    {
        path: 'edit-car/:id',
        component: CarformComponent
    }
];
