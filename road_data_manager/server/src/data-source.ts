import "reflect-metadata"
import { DataSource } from "typeorm"
import { Car } from "./entity/Car"
import { Driver } from "./entity/Driver"
import { Travel } from "./entity/Travel"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "road_database",
    synchronize: true,
    logging: true,
    entities: [Car, Driver, Travel, User],
    migrations: [],
    subscribers: [],
})
