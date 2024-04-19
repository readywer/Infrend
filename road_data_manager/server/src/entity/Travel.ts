import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Car } from './Car';
import { Driver } from './Driver';
import { TravelType } from "../../../models";

@Entity()
export class Travel {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Driver)
    @JoinColumn()
    driver: Driver;

    @OneToOne(type => Car)
    @JoinColumn()
    car: Car;

    @Column({ type: 'date' })
    date: string;

    @Column({
        type: 'enum',
        enum: TravelType,
        default: TravelType.Work
    })
    type: string;

    @Column()
    startPlace: string;

    @Column()
    endPlace: string;

    @Column()
    traveledDistance: string;

    @Column()
    newMilage: string;

}