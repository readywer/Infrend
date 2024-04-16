import { Routes } from '@angular/router';
import { DriverListComponent } from './driver-list/driver-list.component';
import { CarListComponent } from './car-list/car-list.component';

export const routes: Routes = [
    {
        path: '',
        component: DriverListComponent
    },
    {
        path: 'cars',
        component: CarListComponent
    }
];
