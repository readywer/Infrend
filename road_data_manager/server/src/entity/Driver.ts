import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Driver {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    driversLicenseId: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    licenseExpireDate: string;

    @Column()
    dateOfBirth: string;

}
