import { Controller } from "./base_controller";
import { AppDataSource } from "../data-source";
import { Driver} from "../entity/Driver";

export { Controller } from "./base_controller";
export class DriverController extends Controller {
    repository = AppDataSource.getRepository(Driver);
}