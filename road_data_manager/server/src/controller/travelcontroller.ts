import { Controller } from "./base_controller";
import { AppDataSource } from "../data-source";
import { Travel } from "../entity/Travel";

export { Controller } from "./base_controller";
export class TravelController extends Controller {
    repository = AppDataSource.getRepository(Travel);
}