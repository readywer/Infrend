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
    fuelConsuption: number;
    startingMileage: number;
}
export interface TravelDTO {
    id: number;
    driver: null | DriverDTO;
    car: null | CarDTO;
    date: string;
    type: TravelType;
    startPlace: string;
    endPlace: string;
    traveledDistance: number;
    newMilage: number;
}