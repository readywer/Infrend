import express from 'express'
import { DriverController } from './controller/drivercontroller';
import { CarController } from './controller/carcontroller';
import { TravelController } from './controller/travelcontroller';
import { UserController } from './controller/usercontroller';
import { checkUser } from './protect-routes';


export function getRouter() {
    const router = express.Router();
    const driverController = new DriverController();
    const carcontroller = new CarController();
    const travelcontroller = new TravelController();
    const userController = new UserController();

    router.get('/user', userController.getAll);
    router.get('/user/:id', userController.getOne);
    router.post('/user', userController.create);
    router.post('/user/login', userController.login);
    router.put('/user', checkUser, userController.update);
    router.delete('/user/:id', checkUser, userController.delete);

    router.get('/driver', driverController.getAll);
    router.get('/driver/:id', driverController.getOne);
    router.post('/driver', checkUser, driverController.create);
    router.put('/driver', checkUser, driverController.update);
    router.delete('/driver/:id', checkUser, driverController.delete);

    router.get('/car', carcontroller.getAll);
    router.get('/car/:id', carcontroller.getOne);
    router.post('/car', checkUser, carcontroller.create);
    router.put('/car', checkUser, carcontroller.update);
    router.delete('/car/:id', checkUser, carcontroller.delete);

    router.get('/travel', travelcontroller.getAll);
    router.get('/travel/:id', travelcontroller.getOne);
    router.post('/travel', checkUser, travelcontroller.create);
    router.put('/travel', checkUser, travelcontroller.update);
    router.delete('/travel/:id', checkUser, travelcontroller.delete);

    return router;
}