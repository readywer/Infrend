import { Controller } from "./base_controller";
import { AppDataSource } from "../data-source";
import { Car} from "../entity/Car";

export { Controller } from "./base_controller";
export class CarController extends Controller {
    repository = AppDataSource.getRepository(Car);
}