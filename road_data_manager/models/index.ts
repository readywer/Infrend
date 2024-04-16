export interface DriverDTO {
    id: number
    driversLicenseId: string;
    name: string;
    address: string;
    licenseExpireDate: string;
    dateOfBirth: string;
}
export interface CarDTO {
    id: number
    licensePlate: string;
    type: string;
    fuelType: string;
    fuelConsuption: string;
    startingMileage: string;
}