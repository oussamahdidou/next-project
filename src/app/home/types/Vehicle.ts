export interface Vehicle {
  vehicle_id?: number;
  registrationNumber: string;
  marque: string;
  model: string;
  licensePlate: string;
  year: number;
  createdAt?: Date;
  updatedAt?: Date;
}
