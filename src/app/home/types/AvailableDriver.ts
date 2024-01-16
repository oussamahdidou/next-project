export interface AvailableDriver {
  available_driver_id?:any;
  vehicleId?:any;
  vehicle?: any;
  startTime: Date;
  endTime: Date;
  availableVolume: number;
  availableWeight: number;
  startWarehouse: any;
  destination: any;
  waypoints: any[];
  score?: number;
}
