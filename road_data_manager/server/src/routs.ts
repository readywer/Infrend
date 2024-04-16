import express from 'express'
import { DriverController } from './controller/drivercontroller';
import { CarController } from './controller/carcontroller';


export function getRouter(){
    const router = express.Router();

    const driverController = new DriverController();
    const carcontroller= new CarController();

    router.get('/driver',driverController.getAll);
    router.get('/driver/:id',driverController.getOne);
    router.post('/driver',driverController.create);
    router.put('/driver',driverController.update);
    router.get('/driver/:id',driverController.delete);

    router.get('/car',carcontroller.getAll);
    router.get('/car/:id',carcontroller.getOne);
    router.post('/car',carcontroller.create);
    router.put('/car',carcontroller.update);
    router.get('/car/:id',carcontroller.delete);

    return router;
}