export enum TravelType {
    Work = 'céges',
    Private = 'magán'
}
export interface DriverDTO {
    id: number;
    driversLicenseId: string;
    name: string;
    address: string;
    licenseExpireDate: string;
    dateOfBirth: string;
}
export interface CarDTO {
    id: number;
    licensePlate: string;
    type: string;
    fuelType: string;
    fuelConsuption: string;
    startingMileage: string;
}
export interface TravelDTO {
    id: number;
    driver: DriverDTO;
    car: CarDTO;
    date: string;
    type: TravelType;
    startPlace: string;
    endPlace: string;
    traveledDistance: string;
    newMilage: string;
}