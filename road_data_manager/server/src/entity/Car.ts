import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Car {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    licensePlate: string;

    @Column()
    type: string;

    @Column()
    fuelType: string;

    @Column()
    fuelConsuption: string;

    @Column()
    startingMileage: string;
}