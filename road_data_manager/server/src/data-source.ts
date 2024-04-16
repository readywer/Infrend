import "reflect-metadata"
import { DataSource } from "typeorm"
import { Car } from "./entity/Car"
import { Driver } from "./entity/Driver"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "road_database",
    synchronize: true,
    logging: true,
    entities: [Car,Driver],
    migrations: [],
    subscribers: [],
})
