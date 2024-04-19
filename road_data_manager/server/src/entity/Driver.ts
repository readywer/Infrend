import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Driver {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    driversLicenseId: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    licenseExpireDate: string;

    @Column({ type: 'date' })
    dateOfBirth: string;

}
